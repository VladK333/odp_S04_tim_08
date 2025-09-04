import React from 'react';

interface DeleteChatButtonProps {
  onDelete: () => void;
  disabled?: boolean;
}

const DeleteChatButton: React.FC<DeleteChatButtonProps> = ({ onDelete, disabled = false }) => {
  return (
    <button
      onClick={onDelete}
      disabled={disabled}
      style={{
        backgroundColor: '#e040fb', // pink
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        fontWeight: 'bold',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: '0 4px 8px rgba(224, 64, 251, 0.5)',
        transition: 'background-color 0.3s ease',
      }}
      onMouseEnter={e => {
        if (!disabled) e.currentTarget.style.backgroundColor = '#b000d0';
      }}
      onMouseLeave={e => {
        if (!disabled) e.currentTarget.style.backgroundColor = '#e040fb';
      }}
      aria-label="Delete Chat"
      title="Delete Chat"
    >
      Delete Chat
    </button>
  );
};

export default DeleteChatButton;