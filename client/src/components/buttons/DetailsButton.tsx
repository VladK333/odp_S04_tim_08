import React from 'react';
import './DetailsButton.css';

interface DetailsButtonProps {
  onClick: () => void;
}

const DetailsButton: React.FC<DetailsButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="detailsButton"
      aria-label="Show user details"
      type="button"
    >
      Details
    </button>
  );
};

export default DetailsButton;
