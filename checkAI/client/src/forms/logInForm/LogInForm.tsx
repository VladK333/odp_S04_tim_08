// src/forms/logInForm/LogInForm.tsx
import React from 'react';

interface LoginFormProps {
  onClose: () => void;
  onRegisterClick: () => void;  // callback za otvaranje sign in forme
  onContinueAsGuest: () => void; // callback za Continue as Guest dugme
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onRegisterClick, onContinueAsGuest  }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose(); // zatvori login formu na Log In
  };

  return (
    <form style={styles.form} noValidate onSubmit={handleSubmit}>
      <h2 style={styles.title}>Login</h2>

      <label htmlFor="email" style={styles.label}>
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        style={styles.input}
        required
        autoComplete="email"
      />

      <label htmlFor="password" style={styles.label}>
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Enter your password"
        style={styles.input}
        required
        autoComplete="current-password"
      />

      <button type="submit" style={styles.loginButton}>
        Log In
      </button>

      <div style={styles.options}>
        <button
          type="button"
          style={styles.optionButton}
          onClick={onRegisterClick}  // otvara sign in formu
        >
          Register
        </button>
        <span style={styles.separator}>|</span>
        <button type="button" style={styles.optionButton}
        onClick={onContinueAsGuest}
        >
          Continue as Guest
        </button>
      </div>
    </form>
  );
};

const styles: Record<string, React.CSSProperties> = {
  form: {
    width: 360,
    //margin: '0 auto',
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#f9f7fa',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: 24,
    fontSize: 28,
    fontWeight: '700',
    color: '#d252bdff',
    textAlign: 'center',
  },
  label: {
    marginBottom: 6,
    fontWeight: 600,
    fontSize: 14,
    color: '#333',
  },
  input: {
    marginBottom: 16,
    padding: '10px 14px',
    borderRadius: 6,
    border: '1.5px solid #d252bdff',
    fontSize: 15,
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  loginButton: {
    marginTop: 8,
    padding: '10px 0',
    borderRadius: 8,
    border: 'none',
    backgroundColor: '#d252bdff',
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    cursor: 'pointer',
    userSelect: 'none',
    boxShadow: '0 2px 8px rgba(156, 53, 144, 0.8)',
    transition: 'background-color 0.3s ease',
  },
  options: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  optionButton: {
    background: 'none',
    border: 'none',
    color: '#d252bdff',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 14,
    padding: '4px 8px',
    userSelect: 'none',
    textDecoration: 'underline',
  },
  separator: {
    color: '#999',
    fontSize: 14,
  },
};

export default LoginForm;