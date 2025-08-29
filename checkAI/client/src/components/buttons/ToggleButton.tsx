import React from 'react';

interface ToggleButtonProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const baseStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 40,
    height: 40,
    border: 'none',
    backgroundColor: '#cd55abff',
    color: 'white',
    fontSize: 20,
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 6px rgba(0,0,0,0.3)',
    zIndex: 2100,
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ isOpen, toggleSidebar }) => {
  const dynamicStyles: React.CSSProperties = isOpen
    ? {
        right: -10,
        position: 'absolute',
        transform: 'translateY(-50%)',
      }
    : {
        left: -10,
        position: 'fixed',
        top: '50%',
        transform: 'translateY(-50%)',
      };

  const combinedStyles = { ...baseStyles, ...dynamicStyles };

  return (
    <button
      onClick={toggleSidebar}
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      style={combinedStyles}
      type="button"
    >
      {isOpen ? '<' : '>'}
    </button>
  );
};

export default ToggleButton;