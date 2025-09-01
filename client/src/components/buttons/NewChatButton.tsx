import React from 'react';
import './NewChatButton.css';

interface NewChatButtonProps {
  onNewChatClick: () => void;
  formsOpen?: boolean;
  className?: string;
}

const NewChatButton: React.FC<NewChatButtonProps> = ({
  onNewChatClick,
  formsOpen = false,
  className,
}) => {
  const buttonClass = `${className || 'newChatButton'} ${formsOpen ? 'blur' : ''}`;

  return (
    <button
      className={buttonClass}
      onClick={!formsOpen ? onNewChatClick : undefined}
      disabled={formsOpen}
      aria-disabled={formsOpen}
    >
      New Chat
    </button>
  );
};

export default NewChatButton;
