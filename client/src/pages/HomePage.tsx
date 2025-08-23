import React, { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import LoginForm from '../forms/logInForm/LogInForm';
import SignInForm from '../forms/signInForm/SignInForm';
import Navbar from '../components/navbar/Navbar';
import Chat from "../components/Chat";  // Importuj Chat komponentu

import type { User } from '../types/User';


const guestUser: User = {
  firstName: 'Guest',
  lastName: '',
  email: '',
  password: '',
  dateOfBirth: '',
  phoneNumber: '',
  type: 'guest',
  imgSrc: '/images/user.png',
  messagesLeft: 50,
};

function HomePage() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showSidebar] = useState(true);

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [chatOpen, setChatOpen] = useState(true);
  const toggleChat = () => setChatOpen(prev => !prev);
  const [newChatCounter, setNewChatCounter] = useState(0);
  const [isGuest, setIsGuest] = React.useState(false);


  const continueAsGuest = () => {
  setIsGuest(true);
  setCurrentUser(guestUser);
  setShowLogin(false);
  setShowSignInForm(false);
};

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
    setNewChatCounter(prev => prev + 1); // dodato
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

  /*
   // Kada korisnik uspešno uloguje
  const handleLoginComplete = (loggedInUser: User) => {
    setCurrentUser(loggedInUser);
    setShowLogin(false);
  };*/

  const formsOpen = showLogin || showSignInForm;

  return (
    <>
      <Navbar onNewChatClick={handleNewChat} onHistoryClick={handleHistoryClick} formsOpen={formsOpen} isGuest={isGuest}/>
      <Sidebar user={currentUser} isOpen={showSidebar} />

      {/* Ovde prikazujemo Chat komponentu */}
      <div style={{ padding: 20, width: showSidebar ? "60%" : "97%" }}>
        <Chat newChatTrigger={newChatCounter} 
    user={currentUser} 
    setUser={setCurrentUser}/>
      </div>

      {formsOpen && <div style={styles.overlay} />}

      {showLogin && (
        <div style={styles.formWrapper}>
          <LoginForm onClose={closeLoginForm} onRegisterClick={openSignInForm} onContinueAsGuest={continueAsGuest} />
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
    boxSizing: 'border-box',
  },
};

export default HomePage;