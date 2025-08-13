import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import LoginForm from './forms/logInForm/LogInForm';

const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password:'123',
  dateOfBirth: '1.1.2000',
  phoneNumber: '063123123',
  type: 'premium' as const,
  imgSrc: 'https://i.pravatar.cc/150?img=3',
  messagesLeft: 20,
};

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar user={user} />
      </div>

      {showLogin && (
        <>
          {/* Overlay mutna pozadina */}
          <div style={styles.overlay} />
          {/* Login forma na sredini */}
          <div style={styles.loginWrapper}>
            <LoginForm onClose={() => setShowLogin(false)} />
          </div>
        </>
      )}
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    backdropFilter: 'blur(4px)',
    zIndex: 9999,
  },
  loginWrapper: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10000,
    width: '100%',
    maxWidth: 400,
    padding: 16,
    boxSizing: 'border-box',
  }
};

export default App;