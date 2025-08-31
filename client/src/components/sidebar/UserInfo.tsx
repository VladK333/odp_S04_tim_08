// UserInfo.tsx
import React from 'react';

interface UserInfoProps {
  firstName: string;
  lastName: string;
  type: 'guest' | 'regular' | 'premium';
  imgSrc: string;
  messagesLeft: number;
}

const UserInfo: React.FC<UserInfoProps> = ({
  firstName,
  lastName,
  type,
  imgSrc,
  messagesLeft,
}) => {
  const labelColor = type === 'premium' ? '#FFD700' : '#007BFF';

  return (
    <div style={styles.profileContainer}>
      <img
        src={imgSrc}
        alt={`${firstName} ${lastName}`}
        style={styles.profileImage}
      />
      <h2 style={styles.name}>
        {firstName} {lastName}
      </h2>
      <div style={styles.messagesLeftLabel}>
         <strong>No. messages left:</strong> {type === 'premium' ? '∞' : messagesLeft}
      </div>
      <span style={{ ...styles.userTypeLabel, backgroundColor: labelColor }}>
        {type.toUpperCase()}
      </span>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  profileContainer: {
    textAlign: 'center',
    width: '100%',
    transition: 'opacity 0.3s ease',
    userSelect: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #007BFF',
    marginBottom: 20,
  },
  name: {
    margin: '0 0 8px 0',
    fontSize: 24,
    fontWeight: 600,
    color: '#333',
  },
  email: {
    margin: '0 0 15px 0',
    fontSize: 14,
    color: '#666',
    wordBreak: 'break-word',
  },
  messagesLeftLabel: {
    marginBottom: 12,
    fontSize: 14,
    color: '#444',
    userSelect: 'none',
  },
  userTypeLabel: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: 18,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    userSelect: 'none',
  },
};

export default UserInfo;