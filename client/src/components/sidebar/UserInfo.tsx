import React from 'react';
import './UserInfo.css';

interface UserInfoProps {
  fullname: string;
  isPremium: boolean;
  messagesLeft: number | typeof Infinity;
}

const UserInfo: React.FC<UserInfoProps> = ({
  fullname,
  isPremium,
  messagesLeft,
}) => {
  return (
    <div className="profileContainer">
      <img
        src={'/images/user.png'}
        alt={fullname}
        className="profileImage"
      />
      <h2 className="name">{fullname}</h2>

      <div className="messagesLeftLabel">
        {isPremium ? (
          <strong>Messages left: ∞ (unlimited)</strong>
        ) : (
          <>
            <strong>Messages left:</strong> {messagesLeft}
          </>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
