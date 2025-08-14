import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import LoginForm from './forms/logInForm/LogInForm';
import SignInForm from './forms/signInForm/SignInForm';

const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: '123',
  dateOfBirth: '1.1.2000',
  phoneNumber: '063123123',
  type: 'premium' as const,
  imgSrc: 'https://i.pravatar.cc/150?img=3',
  messagesLeft: 20,
};

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignInForm, setShowSignInForm] = useState(false);

  // Funkcija za otvaranje SignIn forme iz Login forme
  const openSignInForm = () => {
    setShowLogin(false);
    setShowSignInForm(true);
  };

  // Funkcija za zatvaranje SignIn forme
  const closeSignInForm = () => {
    setShowSignInForm(false);
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar user={user} />
      </div>

      {(showLogin || showSignInForm) && (
        <div
          style={styles.overlay}
          // Klik na overlay zatvara otvorenu formu
          onClick={() => {
            if (showLogin) setShowLogin(false);
            if (showSignInForm) setShowSignInForm(false);
          }}
        />
      )}

      {showLogin && (
        <div style={styles.loginWrapper}>
          <LoginForm
            onClose={() => setShowLogin(false)}
            onRegisterClick={openSignInForm} // Prosleđujemo callback za otvaranje sign-in forme
          />
        </div>
      )}

      {showSignInForm && (
        <div style={styles.loginWrapper}>
          <SignInForm onClose={closeSignInForm} />
        </div>
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
    maxWidth: 900, // Povećano sa 400 na 900 da stane široka SignIn forma
    padding: 16,
    boxSizing: 'border-box',
  },
};

export default App;