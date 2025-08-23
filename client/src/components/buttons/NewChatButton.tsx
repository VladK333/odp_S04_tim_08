import React from 'react';

interface NewChatButtonProps {
  onNewChatClick: () => void;
  formsOpen?: boolean;
  style?: React.CSSProperties;
}

const NewChatButton: React.FC<NewChatButtonProps> = ({ onNewChatClick, formsOpen = false, style }) => {
  return (
    <button
      style={{
        padding: '8px 16px',
        borderRadius: 12,
        border: 'none',
        backgroundColor: '#d252bdff',
        color: 'white',
        fontWeight: '600',
        userSelect: 'none',
        transition: 'filter 0.3s ease',
        filter: formsOpen ? 'blur(2px)' : 'none',
        cursor: formsOpen ? 'unset' : 'pointer',
        ...style,
      }}
      onClick={!formsOpen ? onNewChatClick : undefined}
      disabled={formsOpen}
      aria-disabled={formsOpen}
    >
      New Chat
    </button>
  );
};

export default NewChatButton;