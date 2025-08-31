// DetailsForm.tsx
import React from 'react';

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
      {/* Overlay */}
      <div style={styles.overlay} onClick={onClose} aria-label="Close details form" />

      {/* Modal container */}
      <div role="dialog" aria-modal="true" aria-labelledby="detailsFormTitle" style={styles.modal}>
        <h2 id="detailsFormTitle" style={styles.title}>User Details</h2>
        <div style={styles.content}>
          <img src={user.imgSrc} alt={`${user.firstName} ${user.lastName}`} style={styles.avatar} />
          <ul style={styles.list}>
            <li><strong>First Name:</strong> {user.firstName}</li>
            <li><strong>Last Name:</strong> {user.lastName}</li>
            <li><strong>Email:</strong> {user.email}</li>
            <li><strong>Date of Birth:</strong> {user.dateOfBirth}</li>
            <li><strong>Phone Number:</strong> {user.phoneNumber}</li>
            <li><strong>User Type:</strong> {user.type}</li>
          </ul>
        </div>
        <button type="button" onClick={onClose} style={styles.closeButton} aria-label="Close details form">
          Close
        </button>
      </div>
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top:0,
    left:0,
    width:'100vw',
    height:'100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    maxWidth: 400,
    width: '90%',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: 10,
  },
  content: {
    width: '100%',
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: 16,
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    width: '100%',
    fontSize: 14,
    color: '#333',
    lineHeight: 1.5,
  },
  closeButton: {
    backgroundColor: '#cd55abff',
    color: 'white',
    border: 'none',
    padding: '10px 24px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: 15,
    userSelect: 'none',
    transition: 'background-color 0.3s ease',
  }
};

export default DetailsForm;