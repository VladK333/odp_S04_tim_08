import React from 'react';
import NewChatButton from '../buttons/NewChatButton';
import HistoryButton from '../buttons/HistoryButton';
import './Navbar.css';

interface NavbarProps {
  onNewChatClick: () => void;
  formsOpen?: boolean;
  isGuest: boolean;
  onHistoryClick?: () => void; // <-- dodaj ovo
}

const Navbar: React.FC<NavbarProps> = ({ onNewChatClick, formsOpen, isGuest }) => {
  return (
    <nav className="navbar">
      <div className="leftSection">
        <div className="appName">CheckAI</div>

        <NewChatButton
          onNewChatClick={onNewChatClick}
          formsOpen={formsOpen}
          className="newChatButton"
        />
      </div>

      <div className="rightSection">
        {!formsOpen && !isGuest && <HistoryButton className="historyButton" />}
      </div>
    </nav>
  );
};

export default Navbar;


/* ne znam da li je sjebao pa bolje da imamo css kako treba da izgleda

const styles: Record<string, React.CSSProperties> = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    top: 0,
    position: 'fixed',
    left: 0,
    width: '100%',
    padding: '0 20px',
    boxSizing: 'border-box',
    boxShadow: '0 2px 8px rgba(0,0,0,0.7)',
    userSelect: 'none',
    //backgroundColor: 'white',
    zIndex: 10000,
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    width: 280,
    justifyContent: 'space-between',
  },
  appName: {
    fontWeight: '600',
    fontSize: 24,
    color: '#d252bdff',
  },
  newChatButton: {
    padding: '8px 16px',
    borderRadius: 12,
    border: 'none',
    backgroundColor: '#d252bdff',
    color: 'white',
    fontWeight: '600',
    userSelect: 'none',
    transition: 'filter 0.3s ease',
  },
  rightSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  historyButton: {
    padding: '8px 20px',
    borderRadius: 12,
    border: '1.5px solid #d252bdff',
    backgroundColor: 'transparent',
    color: '#d252bdff',
    fontWeight: '600',
    fontSize: 16,
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
};

export default Navbar;*/