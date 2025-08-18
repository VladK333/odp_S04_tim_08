import React, { useState } from 'react';
import UserInfo from './UserInfo';
import DetailsButton from '../buttons/DetailsButton';
import DetailsForm from '../../forms/detailsForm/DetailsForm';
//import LoginForm from '../../forms/logInForm/LogInForm';
//import SignInForm from '../../forms/signInForm/SignInForm';

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
  user: User;
  isOpen: boolean;
  isGuest: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false); // Uvek skriven kad se pokrene
  const [showDetails, setShowDetails] = useState(false);
  const [isGuest, setIsGuest] = useState(false);


  const toggleSidebar = () => setIsOpen(prev => !prev);

  const handleAuthClick = () => {
     location.reload(); //refresh home page
  };

  const handleDetailsClick = () => setShowDetails(true);
  const handleCloseDetails = () => setShowDetails(false);

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
            aria-label={isGuest ? 'Log In' : 'Log Out'}
            type="button"
          >
            {isGuest ? 'Log In' : 'Log Out'}
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
            <UserInfo {...user} />
            {!isGuest && <DetailsButton onClick={handleDetailsClick} />}
          </div>
        </div>

        {isOpen && (
          <button
            onClick={toggleSidebar}
            aria-label="Close sidebar"
            style={{ ...styles.toggleButton, right: -10 }}
          >
            &lt;
          </button>
        )}
      </aside>

      {!isOpen && (
        <button
          onClick={toggleSidebar}
          aria-label="Open sidebar"
          style={{
            ...styles.toggleButton,
            left: -10,
            top: '50%',
            position: 'fixed',
            transform: 'translateY(-50%)',
          }}
        >
          &gt;
        </button>
      )}

      {showDetails && !isGuest && (
        <DetailsForm user={user} onClose={handleCloseDetails} />
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
  toggleButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 40,
    height: 40,
    border: 'none',
    backgroundColor: '#cd55abff',
    color: 'white',
    fontSize: 20,
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 6px rgba(0,0,0,0.3)',
    zIndex: 2100,
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    //backdropFilter: 'blur(4px)',
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