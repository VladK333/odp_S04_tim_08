import React from 'react';
import './ToggleButton.css';

interface ToggleButtonProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isOpen, toggleSidebar }) => {
  const buttonClass = `toggleButton ${isOpen ? 'open' : 'closed'}`;

  return (
    <button
      onClick={toggleSidebar}
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      className={buttonClass}
      type="button"
    >
      {isOpen ? '<' : '>'}
    </button>
  );
};

export default ToggleButton;
