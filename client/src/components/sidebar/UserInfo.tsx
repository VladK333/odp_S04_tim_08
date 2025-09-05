import React from 'react';
import './UserInfo.css';

interface UserInfoProps {
  fullname: string;
  isPremium: boolean;
  messagesLeft: number | string;
}

const UserInfo: React.FC<UserInfoProps> = ({
  fullname,
  isPremium,
  messagesLeft,
}) => {
  //const type = isPremium ? 'premium' : 'regular';
  //const labelColor = isPremium ? '#FFD700' : '#007BFF';

  return (
    <div className="profileContainer">
      <img
        src={'/images/user.png'}
        alt={fullname}
        className="profileImage"
      />
      <h2 className="name">{fullname}</h2>
      <div className="messagesLeftLabel">
        <strong>No. messages left:</strong> {isPremium ? '∞' : messagesLeft}
      </div>
    </div>
  );
};

export default UserInfo;
