import  { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import LoginForm from '../forms/logInForm/LogInForm';
import SignInForm from '../forms/signInForm/SignInForm';
import Navbar from '../components/navbar/Navbar';
import Chat from "../components/chat/Chat";
import type { User } from '../types/User';
import './HomePage.css'; // Import CSS fajla

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
        setUser={setCurrentUser}
      />

      <div className={`main-content ${showSidebar ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Chat newChatTrigger={newChatCounter} user={currentUser} setUser={setCurrentUser} />
      </div>

      {formsOpen && <div className="overlay" />}

      {showLogin && (
        <div className="form-wrapper">
          <LoginForm
            onClose={() => setShowLogin(false)}
            onRegisterClick={openSignInForm}
            onContinueAsGuest={continueAsGuest}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      )}

      {showSignInForm && (
        <div className="form-wrapper">
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

export default HomePage;
