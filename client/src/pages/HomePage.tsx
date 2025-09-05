import { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import LoginForm from '../components/auth/logInForm/LogInForm';
import RegisterForm from '../components/auth/registerForm/RegisterForm';
import Navbar from '../components/navbar/Navbar';
import Chat from "../components/chat/Chat";
import type { User } from '../types/User';
import './HomePage.css'; // Import CSS fajla
import type { IAuthAPIService } from '../api/auth/IAuthAPIService';

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

interface HomePageProps {
  authService: IAuthAPIService; // injected via props
}

const HomePage: React.FC<HomePageProps> = ({ authService }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showSidebar] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newChatCounter, setNewChatCounter] = useState(0);
  const [isGuest, setIsGuest] = useState(false);

  const clearSession = () => {
    // brišemo sve tragove pravog logina
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");

    // brišemo cookie-e
    document.cookie.split(";").forEach(c => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  };

  const continueAsGuest = () => {
    clearSession(); // očisti login state
    setIsGuest(true);
    setCurrentUser({ ...guestUser }); // lokalni guest objekat
    setShowLogin(false);
    setShowRegisterForm(false);
    setNewChatCounter(prev => prev + 1); // otvori nov chat odmah
  };

  const openRegisterForm = () => {
    setShowLogin(false);
    setShowRegisterForm(true);
  };

  const backToLogin = () => {
    setShowRegisterForm(false);
    setShowLogin(true);
  };

  const handleNewChat = () => {
    setNewChatCounter(prev => prev + 1);
    setShowLogin(false);
    setShowRegisterForm(false);
  };

  const handleHistoryClick = () => {
    console.log('History clicked');
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setShowLogin(false);
    setShowRegisterForm(false);
    setIsGuest(false); // resetujemo guest mod
    setNewChatCounter(prev => prev + 1); // novi chat za pravog usera
  };

  const formsOpen = showLogin || showRegisterForm;

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
        <Chat 
          newChatTrigger={newChatCounter} 
          user={currentUser} 
          setUser={setCurrentUser} 
          isGuest={isGuest} 
        />
      </div>

      {formsOpen && <div className="overlay" />}

      {showLogin && (
        <div className="form-wrapper">
          <LoginForm
            authService={authService}
            onClose={() => setShowLogin(false)}
            onRegisterClick={openRegisterForm}
            onContinueAsGuest={continueAsGuest}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      )}

      {showRegisterForm && (
        <div className="form-wrapper">
          <RegisterForm
            authService={authService}
            onClose={() => setShowRegisterForm(false)}
            onLoginClick={backToLogin}
            onContinueAsGuest={continueAsGuest}
            onRegisterSuccess={handleLoginSuccess}
          />
        </div>
      )}
    </>
  );
};

export default HomePage;
