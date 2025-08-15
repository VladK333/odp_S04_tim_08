// App.tsx
import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import LoginForm from './forms/logInForm/LogInForm';
import SignInForm from './forms/signInForm/SignInForm';
import Navbar from './components/navbar/Navbar';

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
  const [showSidebar, setShowSidebar] = useState(true); // primer ako hoćeš kontrolu sidebara


  const openSignInForm = () => {
    setShowLogin(false);
    setShowSignInForm(true);
  };

  const closeSignInForm = () => {
    setShowSignInForm(false);
  };

  const closeLoginForm = () => {
    setShowLogin(false);
  };

  const backToLogin = () => {
    setShowSignInForm(false);
    setShowLogin(true);
  };

  const handleNewChat = () => {
  // Ovde možeš da resetuješ stanje chat-a ili prikazuješ novi chat
  console.log('New Chat clicked');
  // Primer: sakrij forme ako su otvorene
  setShowLogin(false);
  setShowSignInForm(false);
};

  return (
    <>
     <Navbar onNewChatClick={handleNewChat} />
      <Sidebar user={user} />

      {/* Overlay prikazan samo dok je neka forma otvorena */}
      {(showLogin || showSignInForm) && (
        <div style={styles.overlay} />
      )}

      {/* Login forma */}
      {showLogin && (
        <div style={styles.formWrapper}>
          <LoginForm onClose={closeLoginForm} onRegisterClick={openSignInForm} />
        </div>
      )}

      {/* SignIn forma */}
      {showSignInForm && (
        <div style={styles.formWrapper}>
          <SignInForm onClose={closeSignInForm} onBackToLogin={backToLogin} />
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
  formWrapper: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10000,
    width: '90%',
    maxWidth: 900,
    padding: 16,
    boxSizing: 'border-box',
  },
};

export default App;