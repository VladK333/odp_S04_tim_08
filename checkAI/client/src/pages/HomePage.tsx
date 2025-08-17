import React, { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import LoginForm from '../forms/logInForm/LogInForm';
import SignInForm from '../forms/signInForm/SignInForm';
import Navbar from '../components/navbar/Navbar';

import type { User } from '../types/User';

/*
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
};*/

function HomePage() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showSidebar] = useState(true);

  const [currentUser, setCurrentUser] = useState<User | null>(null);

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
    console.log('New Chat clicked');
    setShowLogin(false);
    setShowSignInForm(false);
  };

  const handleHistoryClick = () => {
    console.log('History clicked');
  };

  const handleRegisterComplete = (newUser: User) => {
    console.log('New user registered:', newUser);
    setCurrentUser(newUser); // setujemo trenutno prijavljenog korisnika
    backToLogin(); // vrati na login formu ili direktno zatvori formu
  };

   // Kada korisnik uspešno uloguje
  const handleLoginComplete = (loggedInUser: User) => {
    setCurrentUser(loggedInUser);
    setShowLogin(false);
  };



  const formsOpen = showLogin || showSignInForm;

  return (
    <>
      <Navbar onNewChatClick={handleNewChat} onHistoryClick={handleHistoryClick} formsOpen={formsOpen} />
      <Sidebar user={currentUser} isOpen={showSidebar} />

      {formsOpen && <div style={styles.overlay} />}

      {showLogin && (
        <div style={styles.formWrapper}>
          <LoginForm onClose={closeLoginForm} onRegisterClick={openSignInForm} />
        </div>
      )}

      {showSignInForm && (
        <div style={styles.formWrapper}>
          <SignInForm
            onClose={closeSignInForm}
            onBackToLogin={backToLogin}
            onRegisterComplete={handleRegisterComplete}
          />
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
    //width: '90%',
    //maxWidth: 900,
    //padding: 16,
    boxSizing: 'border-box',
  },
};

export default HomePage;