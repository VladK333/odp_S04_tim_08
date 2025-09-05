import React, { useState } from 'react';
import './Sidebar.css';
import UserInfo from './UserInfo';
import ToggleButton from '../buttons/ToggleButton';
import { useAuth } from '../../hooks/auth/useAuthHook';
import { AuthAPIService } from '../../api/auth/AuthAPIService';
import LoginForm from '../auth/logInForm/LogInForm';

const authService = new AuthAPIService();

interface User {
  fullname: string;
  email: string;
  isPremium: boolean;
  messagesLeft: number;
}

const guestUser: User = {
  fullname: 'Guest',
  email: '',
  isPremium: false,
  messagesLeft: 50,
};

const Sidebar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  // Klik na Log In / Log Out dugme
  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      setShowLoginForm(true);
    }
  };

  const handleLoginClose = () => setShowLoginForm(false);

  // Map AuthUser na tip koji UserInfo očekuje
  const mappedUser: User = user
    ? {
        fullname: user.email, // ako želiš fullname, možeš ga ovde dodati
        email: user.email,
        isPremium: user.isPremium,
        messagesLeft: user.isPremium ? Infinity : 50,
      }
    : guestUser;

  const isGuest = mappedUser.fullname === 'Guest';
  const showOverlay = showLoginForm;

return (
  <>
    {/* Sidebar */}
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
          <UserInfo
            fullname={mappedUser.fullname}
            isPremium={mappedUser.isPremium}
            messagesLeft={mappedUser.messagesLeft}
          />
        </div>
      </div>

      {isOpen && <ToggleButton isOpen={isOpen} toggleSidebar={toggleSidebar} />}
    </aside>

    {/* Toggle kada je sidebar zatvoren */}
    {!isOpen && <ToggleButton isOpen={isOpen} toggleSidebar={toggleSidebar} />}

    {/* Login forma i overlay (renderovati izvan sidebar-a) */}
    {showLoginForm && (
  <>
    <div
      className="overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)', // zamagljuje sve
        zIndex: 3000, // veći od navbar i sidebar
      }}
      onClick={handleLoginClose}
    />
    <div
      className="loginWrapper"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 3100, // iznad overlay-a
        width: '100%',
        maxWidth: '400px',
      }}
    >
      <LoginForm
        authService={authService}
        onClose={handleLoginClose}
        onRegisterClick={() => {}}
        onContinueAsGuest={() => setShowLoginForm(false)}
      />
    </div>
  </>
)}


  </>
);


};

export default Sidebar;
