import React from 'react';
import './UserInfo.css';

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
    <div className="profileContainer">
      <img
        src={imgSrc}
        alt={`${firstName} ${lastName}`}
        className="profileImage"
      />
      <h2 className="name">
        {firstName} {lastName}
      </h2>
      <div className="messagesLeftLabel">
         <strong>No. messages left:</strong> {type === 'premium' ? '∞' : messagesLeft}
      </div>
      <span className="userTypeLabel" style={{ backgroundColor: labelColor }}>
        {type.toUpperCase()}
      </span>
    </div>
  );
};

export default UserInfo;
