import React from 'react';
import './CreateButton.css';

interface CreateButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const CreateButton: React.FC<CreateButtonProps> = ({ children = 'Create', ...props }) => {
  return (
    <button type="submit" className="createButton" {...props}>
      {children}
    </button>
  );
};

export default CreateButton;
