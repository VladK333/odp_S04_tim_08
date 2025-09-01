import React from 'react';
import './DetailsForm.css';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  phoneNumber: string;
  type: 'guest' | 'regular' | 'premium';
  imgSrc: string;
  messagesLeft: number;
}

interface DetailsFormProps {
  user: User;
  onClose: () => void;
}

const DetailsForm: React.FC<DetailsFormProps> = ({ user, onClose }) => {
  return (
    <>
      <div className="detailsOverlay" onClick={onClose} aria-label="Close details form" />
      <div role="dialog" aria-modal="true" aria-labelledby="detailsFormTitle" className="detailsModal">
        <h2 id="detailsFormTitle" className="detailsTitle">User Details</h2>
        <div className="detailsContent">
          <img src={user.imgSrc} alt={`${user.firstName} ${user.lastName}`} className="detailsAvatar" />
          <ul className="detailsList">
            <li><strong>First Name:</strong> {user.firstName}</li>
            <li><strong>Last Name:</strong> {user.lastName}</li>
            <li><strong>Email:</strong> {user.email}</li>
            <li><strong>Date of Birth:</strong> {user.dateOfBirth}</li>
            <li><strong>Phone Number:</strong> {user.phoneNumber}</li>
            <li><strong>User Type:</strong> {user.type}</li>
          </ul>
        </div>
        <button type="button" onClick={onClose} className="detailsCloseButton" aria-label="Close details form">
          Close
        </button>
      </div>
    </>
  );
};

export default DetailsForm;
