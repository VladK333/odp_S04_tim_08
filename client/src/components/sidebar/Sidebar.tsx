// Sidebar.tsx
import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import UserInfo from './UserInfo';
import ToggleButton from '../buttons/ToggleButton';
import { useAuth } from '../../hooks/auth/useAuthHook';
import { AuthAPIService } from '../../api/auth/AuthAPIService';
import LoginForm from '../auth/logInForm/LogInForm';
import RegisterForm from '../auth/registerForm/RegisterForm';
import type { User } from '../../types/User';

const authService = new AuthAPIService();

const DEFAULT_LIMIT = 50;

const guestUser: User = {
  fullname: 'Guest',
  email: '',
  isPremium: false,
  messagesLeft: DEFAULT_LIMIT,
};

interface SidebarProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isOpen: boolean;
  onGuestChange?: (isGuest: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, setUser, onGuestChange }) => {
  const { user: authUser, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const toggleSidebar = () => setIsOpen(prev => !prev);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      if (onGuestChange) onGuestChange(true);
    } else {
      setAuthMode('login');
      setShowAuthForm(true);
    }
  };

  const handleAuthClose = () => setShowAuthForm(false);

  // Reset poruka kad se loguje regular user
  useEffect(() => {
    if (authUser) {
      if (authUser.isPremium) {
        setUser({
          fullname: authUser.email,
          email: authUser.email,
          isPremium: true,
          messagesLeft: Infinity,
        });
      } else {
        setUser({
          fullname: authUser.email,
          email: authUser.email,
          isPremium: false,
          messagesLeft: DEFAULT_LIMIT, // reset na login
        });
      }
    } else {
      setUser(guestUser); // ako nije ulogovan, guest mode
    }
  }, [authUser, setUser]);

  const isGuest = !authUser;

  return (
    <>
      <aside
        className="sidebar"
        style={{ width: isOpen ? 300 : 0, overflowX: 'hidden', zIndex: 1000 }}
      >
        <div className="topBar">
          <button
            onClick={handleAuthClick}
            className="authButton"
            aria-label={!isGuest ? 'Log out' : 'Log in'}
            type="button"
          >
            {!isGuest ? 'Log Out' : 'Log In'}
          </button>
        </div>

        <div className="userInfoWrapper">
          <div
            style={{
              opacity: isOpen ? 1 : 0,
              transition: 'opacity 0.3s ease',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {user && (
              <UserInfo
                fullname={user.fullname}
                isPremium={user.isPremium}
                messagesLeft={user.messagesLeft}
              />
            )}
          </div>
        </div>

        {isOpen && <ToggleButton isOpen={isOpen} toggleSidebar={toggleSidebar} />}
      </aside>

      {!isOpen && <ToggleButton isOpen={isOpen} toggleSidebar={toggleSidebar} />}

      {showAuthForm && (
        <>
          <div
            className="overlay"
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 3000,
            }}
            onClick={handleAuthClose}
          />
          <div
            className="loginWrapper"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 3100,
              width: '100%',
              maxWidth: '400px',
            }}
          >
            {authMode === 'login' ? (
              <LoginForm
                authService={authService}
                onClose={handleAuthClose}
                onRegisterClick={() => setAuthMode('register')}
                onContinueAsGuest={() => {
                  setShowAuthForm(false);
                  if (onGuestChange) onGuestChange(true);
                }}
              />
            ) : (
              <RegisterForm
                authService={authService}
                onClose={handleAuthClose}
                onLoginClick={() => setAuthMode('login')}
                onRegisterComplete={() => setShowAuthForm(false)}
                onContinueAsGuest={() => {
                  setShowAuthForm(false);
                  if (onGuestChange) onGuestChange(true);
                }}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
