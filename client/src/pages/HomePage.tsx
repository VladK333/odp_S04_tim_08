import React, { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import LoginForm from '../forms/logInForm/LogInForm';
import SignInForm from '../forms/signInForm/SignInForm';
import Navbar from '../components/navbar/Navbar';
import Chat from "../components/Chat";
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
  const [newChatCounter, setNewChatCounter] = useState(0);
  const [isGuest, setIsGuest] = useState(false);

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

  const backToLogin = () => {
    setShowSignInForm(false);
    setShowLogin(true);
  };

  const handleNewChat = () => {
    setNewChatCounter(prev => prev + 1);
    setShowLogin(false);
    setShowSignInForm(false);
  };

  const handleHistoryClick = () => {
    console.log('History clicked');
  };

  const handleRegisterComplete = (newUser: User) => {
    setCurrentUser(newUser);
    backToLogin();
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setShowLogin(false);
    setShowSignInForm(false);
    setIsGuest(user.type === 'guest');
  };

  const formsOpen = showLogin || showSignInForm;

  return (
    <>
      <Navbar
        onNewChatClick={handleNewChat}
        onHistoryClick={handleHistoryClick}
        formsOpen={formsOpen}
        isGuest={isGuest}
      />

      <Sidebar
        user={currentUser}
        isOpen={showSidebar}
        setUser={setCurrentUser} // opcionalno
      />

      <div style={{ padding: 20, width: showSidebar ? "60%" : "97%" }}>
        <Chat newChatTrigger={newChatCounter} user={currentUser} setUser={setCurrentUser} />
      </div>

      {formsOpen && <div style={styles.overlay} />}

      {showLogin && (
        <div style={styles.formWrapper}>
          <LoginForm
            onClose={() => setShowLogin(false)}
            onRegisterClick={openSignInForm}
            onContinueAsGuest={continueAsGuest}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      )}

      {showSignInForm && (
        <div style={styles.formWrapper}>
          <SignInForm
            onClose={() => setShowSignInForm(false)}
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
