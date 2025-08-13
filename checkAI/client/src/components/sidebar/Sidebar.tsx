// Sidebar.tsx
import React, { useState } from 'react';
import UserInfo from './UserInfo';
import DetailsButton from '../buttons/DetailsButton';
import DetailsForm from '../../forms/detailsForm/DetailsForm';
import LoginForm from '../../forms/logInForm/LogInForm'; // importuj login formu

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
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  const handleAuthClick = () => {
    if (signedIn) {
      // Log out
      setSignedIn(false);
      setShowDetails(false);
    } else {
      // Otvori login formu
      setShowLoginForm(true);
    }
  };

  const handleDetailsClick = () => setShowDetails(true);
  const handleCloseDetails = () => setShowDetails(false);

  const handleLoginClose = () => {
    setShowLoginForm(false);
    setSignedIn(true); // posle logovanja, oznaci da je korisnik ulogovan
  };

  return (
    <>
      <aside
        style={{
          ...styles.sidebar,
          width: isOpen ? 270 : 0,
          overflowX: 'hidden',
        }}
      >
        <div style={styles.topBar}>
          <button
            onClick={handleAuthClick}
            style={styles.authButton}
            aria-label={signedIn ? 'Log out' : 'Log in'}
            type="button"
          >
            {signedIn ? 'Log Out' : 'Log In'}
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
            {signedIn && <DetailsButton onClick={handleDetailsClick} />}
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

      {showDetails && signedIn && (
        <DetailsForm user={user} onClose={handleCloseDetails} />
      )}

      {showLoginForm && (
        <>
          <div style={styles.overlay} onClick={() => setShowLoginForm(false)} />
          <div style={styles.loginWrapper}>
            <LoginForm onClose={handleLoginClose} />
          </div>
        </>
      )}
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    position: 'fixed',
    left: 0,
    top: 40,
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
    borderBottom: '1px solid #ccc',
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
    zIndex: 1000,
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    backdropFilter: 'blur(4px)',
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