import React, { useState } from 'react';
import './Sidebar.css';
import UserInfo from './UserInfo';
import DetailsButton from '../buttons/DetailsButton';
import DetailsForm from '../../forms/detailsForm/DetailsForm';
import LoginForm from '../auth/logInForm/LogInForm';
import ToggleButton from '../buttons/ToggleButton';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  phoneNumber: string;
  type: 'guest' | 'regular' | 'premium';
  imgSrc: string;
  messagesLeft: number;
}

interface SidebarProps {
  user: User | null;
  isOpen: boolean;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>; 
}

const guestUser: User = {
  firstName: 'Guest',
  lastName: '',
  email: '',
  password: '',
  dateOfBirth: '',
  phoneNumber: '',
  type: 'guest',
  imgSrc: '/images/user.png',
  messagesLeft: 0,
};

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  const handleAuthClick = () => location.reload();
  const handleDetailsClick = () => setShowDetails(true);
  const handleCloseDetails = () => setShowDetails(false);

  const handleLoginClose = () => setShowLoginForm(false);
  const handleRegisterClick = () => {
    setShowLoginForm(false);
    setShowSignInForm(true);
  };
  const handleSignInClose = () => setShowSignInForm(false);
  const handleContinueAsGuest = () => setShowLoginForm(false);

  const showOverlay = showLoginForm || showSignInForm;
  const userToShow = user || guestUser;
  const isGuest = userToShow.type === 'guest';

  return (
    <>
      <aside className="sidebar" style={{ width: isOpen ? 300 : 0, overflowX: 'hidden' }}>
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
          <div style={{ opacity: isOpen ? 1 : 0, transition: 'opacity 0.3s ease', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <UserInfo
              firstName={userToShow.firstName}
              lastName={userToShow.lastName}
              type={userToShow.type}
              imgSrc={userToShow.imgSrc}
              messagesLeft={userToShow.messagesLeft}
            />

            {!isGuest && <DetailsButton onClick={handleDetailsClick} />}
          </div>
        </div>

        {isOpen && <ToggleButton isOpen={isOpen} toggleSidebar={toggleSidebar} />}
      </aside>

      {!isOpen && <ToggleButton isOpen={isOpen} toggleSidebar={toggleSidebar} />}

      {showDetails && <DetailsForm user={userToShow} onClose={handleCloseDetails} />}

      {showOverlay && (
        <div
          className="overlay"
          onClick={() => {
            if (showLoginForm) setShowLoginForm(false);
            else if (showSignInForm) setShowSignInForm(false);
          }}
        />
      )}

      {/* {showLoginForm && (
        <div className="loginWrapper">
          <LoginForm
            onClose={handleLoginClose}
            onRegisterClick={handleRegisterClick}
            onContinueAsGuest={handleContinueAsGuest}
            onLoginSuccess={(user) => setCurrentUser(user)}
          />
        </div>
      )} */}

      {/* {showSignInForm && (
        <div className="loginWrapper">
          <SignInForm
            onClose={handleSignInClose}
            onBackToLogin={() => {
              setShowSignInForm(false);
              setShowLoginForm(true);
            }}
            onRegisterComplete={(newUser) => {
              setCurrentUser(newUser);
              setShowSignInForm(false);
              setShowLoginForm(true);
            }}
          />
        </div>
      )} */}
    </>
  );
};

export default Sidebar;
