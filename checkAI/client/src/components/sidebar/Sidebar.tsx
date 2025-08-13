// Sidebar.tsx
import React, { useState } from 'react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  type: 'guest' | 'regular' | 'premium';
  imgSrc: string;
  messagesLeft:number;
}

interface SidebarProps {
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(true);

  const labelColor = user.type === 'premium' ? '#FFD700' : '#007BFF';

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  const [signedIn, setSignedIn] = useState(false);

  const handleAuthClick = () => {
    setSignedIn(prev => !prev);
  };

  return (
    <>
      <aside
        style={{
          ...styles.sidebar,
          width: isOpen ? 250 : 0,
          overflowX: 'hidden', // Hide contents when closed
        }}
      >
       <div style={styles.topBar}>
          {/* Sign In / Log Out button */}
          <button
            onClick={handleAuthClick}
            style={styles.authButton}
            aria-label={signedIn ? 'Log out' : 'Sign in'}
          >
            {signedIn ? 'Log Out' : 'Sign In'}
          </button>
        </div>

        <div style={{ ...styles.profileContainer, opacity: isOpen ? 1 : 0 }}>
          <img
            src={user.imgSrc}
            alt={`${user.firstName} ${user.lastName}`}
            style={styles.profileImage}
          />
          <h2 style={styles.name}>{user.firstName} {user.lastName}</h2>
          <p style={styles.email}>{user.email}</p>
                    {/* No. messages left label */}
          <div style={styles.messagesLeftLabel}>
            <strong>No. messages left:</strong> {user.messagesLeft}
          </div>
          <span style={{ ...styles.userTypeLabel, backgroundColor: labelColor }}>
            {user.type.toUpperCase()}
          </span>
        </div>

        {/* Toggle button when sidebar is open */}
        {isOpen && (
          <button
            onClick={toggleSidebar}
            aria-label="Close sidebar"
            style={{
              ...styles.toggleButton,
              right: -10,
            }}
          >
            &lt;
          </button>
        )}
      </aside>

      {/* Toggle button when sidebar is closed */}
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
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    position: 'fixed',
    left: 0,
    top: 40,
    height: '100vh',
    backgroundColor: '#edc9e9ff', //'#f5f5f5'
    boxShadow: '2px 0px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '0',
    boxSizing: 'border-box',
    transition: 'width 0.3s ease',
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
  profileContainer: {
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center',
    width: '80%',
    transition: 'opacity 0.3s ease',
    userSelect: 'none',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #007BFF',
    marginBottom: '20px',
  },
  name: {
    margin: '0 0 8px 0',
    fontSize: '24px',
    fontWeight: 600,
    color: '#333',
  },
  email: {
    margin: '0 0 15px 0',
    fontSize: '14px',
    color: '#666',
    wordBreak: 'break-word',
  },
    messagesLeftLabel: {
    marginBottom: 12,
    fontSize: 14,
    color: '#444',
    userSelect: 'none',
  },
  userTypeLabel: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '18px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '12px',
    userSelect: 'none',
  },
  toggleButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '40px',
    height: '40px',
    //borderRadius: '50%',
    border: 'none',
    backgroundColor: '#cd55abff',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 6px rgba(0,0,0,0.3)',
    zIndex: 1000,
  },
};

export default Sidebar;