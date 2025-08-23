// DetailsButton.tsx
import React from 'react';

interface DetailsButtonProps {
  onClick: () => void;
}

const DetailsButton: React.FC<DetailsButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={styles.button}
      aria-label="Show user details"
      type="button"
    >
      Details
    </button>
  );
};

const styles: Record<string, React.CSSProperties> = {
  button: {
    marginTop: 12,
    backgroundColor: '#cd55abff',
    color: 'white',
    border: 'none',
    padding: '8px 18px',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: 15,
    userSelect: 'none',
    boxShadow: '0 2px 6px rgba(171, 42, 169, 0.5)',
    transition: 'background-color 0.3s ease',
  },
};

export default DetailsButton;