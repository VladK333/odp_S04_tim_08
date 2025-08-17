import React from 'react';

interface NavbarProps {
  onNewChatClick: () => void;
  onHistoryClick?: () => void;
  formsOpen?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onNewChatClick, onHistoryClick, formsOpen }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.leftSection}>
        <div style={styles.appName}>CheckAI</div>

        <button
          style={{
            ...styles.newChatButton,
            filter: formsOpen ? 'blur(2px)' : 'none',
            cursor: formsOpen ? 'unset' : 'pointer',
          }}
          onClick={!formsOpen ? onNewChatClick : undefined}
          disabled={formsOpen}
          aria-disabled={formsOpen}
        >
          New Chat
        </button>
      </div>

      <div style={styles.rightSection}>
        {!formsOpen && (
          <button style={styles.historyButton} onClick={onHistoryClick}>
            History ▼
          </button>
        )}
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

export default Navbar;