// components/navbar/Navbar.tsx
import React from 'react';

interface NavbarProps {
  onNewChatClick: () => void;
  onHistoryClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNewChatClick, onHistoryClick }) => {
  return (
    <nav style={styles.navbar}>
      {/* Levi deo: naziv aplikacije i New Chat dugme */}
      <div style={styles.leftSection}>
        <div style={styles.appName}>CheckAI</div>
        <button style={styles.newChatButton} onClick={onNewChatClick}>
          New Chat
        </button>
      </div>

      {/* Desni deo: History dugme centrirano */}
      <div style={styles.rightSection}>
        <button style={styles.historyButton} onClick={onHistoryClick}>
          History ▼
        </button>
      </div>
    </nav>
  );
};

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
    boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
    userSelect: 'none',
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
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.3s ease',
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

export default Navbar;