import React from 'react';

interface HistoryButtonProps {
  onClick?: () => void;
}

const styles: Record<string, React.CSSProperties> = {
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

const HistoryButton: React.FC<HistoryButtonProps> = ({ onClick }) => {
  return (
    <button style={styles.historyButton} onClick={onClick}>
      History ▼
    </button>
  );
};

export default HistoryButton;