import React, { useState } from 'react';
import UserInfo from './UserInfo';
import DetailsButton from '../buttons/DetailsButton';
import DetailsForm from '../../forms/detailsForm/DetailsForm';
import LoginForm from '../../forms/logInForm/LogInForm';
import SignInForm from '../../forms/signInForm/SignInForm';
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

  const handleAuthClick = () => {
    location.reload();
  };

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
      <aside
        style={{
          ...styles.sidebar,
          width: isOpen ? 300 : 0,
          overflowX: 'hidden',
        }}
      >
        <div style={styles.topBar}>
          <button
            onClick={handleAuthClick}
            style={styles.authButton}
            aria-label={!isGuest ? 'Log out' : 'Log in'}
            type="button"
          >
            {!isGuest ? 'Log Out' : 'Log In'}
          </button>
        </div>

        <div style={styles.userInfoWrapper}>
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
              firstName={userToShow.firstName}
              lastName={userToShow.lastName}
              //email={isGuest ? '' : userToShow.email}
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

      {showDetails && userToShow && (
        <DetailsForm user={userToShow} onClose={handleCloseDetails} />
      )}


      {showOverlay && (
        <div
          style={styles.overlay}
          onClick={() => {
            if (showLoginForm) setShowLoginForm(false);
            else if (showSignInForm) setShowSignInForm(false);
          }}
        />
      )}

      {showLoginForm && (
        <div style={styles.loginWrapper}>
          <LoginForm
            onClose={handleLoginClose}
            onRegisterClick={handleRegisterClick}
            onContinueAsGuest={handleContinueAsGuest}
            onLoginSuccess={(user) => setCurrentUser(user)} // ovde setuješ user-a
          />
        </div>
      )}

      {showSignInForm && (
        <div style={styles.loginWrapper}>
          <SignInForm
            onClose={handleSignInClose}
            onBackToLogin={() => {
              setShowSignInForm(false);
              setShowLoginForm(true);
            }}
            onRegisterComplete={(newUser) => {
              setCurrentUser(newUser); // setuje novog registrovanog korisnika
              setShowSignInForm(false);
              setShowLoginForm(true);
            }}
          />
        </div>
      )}
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    position: 'fixed',
    left: 0,
    top: 50,
    height: 'calc(100vh - 40px)',
    backgroundColor: '#edc9e9ff',
    boxShadow: '2px 0px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 0,
    boxSizing: 'border-box',
    transition: 'width 0.3s ease',
    paddingBottom: 20,
    overflowY: 'auto',
    zIndex: 1000,
  },
  topBar: {
    width: '100%',
    padding: '10px 0 10px 10px',
    display: 'flex',
    justifyContent: 'flex-start',
    boxSizing: 'border-box',
    flexShrink: 0,
  },
  userInfoWrapper: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  authButton: {
    backgroundColor: '#cd55abff',
    color: 'white',
    border: 'none',
    padding: '6px 16px',
    borderRadius: 4,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 14,
    userSelect: 'none',
    transition: 'background-color 0.3s ease',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 2000,
  },
  loginWrapper: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2100,
    width: '100%',
    maxWidth: 400,
    padding: 16,
    boxSizing: 'border-box',
  },
};

export default Sidebar;
