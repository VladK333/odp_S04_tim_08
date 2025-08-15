// src/forms/signInForm/CreateButton.tsx
import React from 'react';

interface CreateButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const CreateButton: React.FC<CreateButtonProps> = ({ children = 'Create', ...props }) => {
  return (
    <button type="submit" style={styles.createButton} {...props}>
      {children}
    </button>
  );
};

const styles: Record<string, React.CSSProperties> = {
  createButton: {
    width: 200,
    padding: '14px 0',
    borderRadius: 12,
    border: 'none',
    backgroundColor: '#d252bdff',
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
    cursor: 'pointer',
    userSelect: 'none',
    boxShadow: '0 4px 14px rgba(164, 54, 148, 0.9)',
    transition: 'background-color 0.3s ease',
  },
};

export default CreateButton;