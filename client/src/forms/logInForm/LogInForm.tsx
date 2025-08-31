import React, { useState } from 'react';
import type { User } from '../../types/User';
import { validateLoginForm } from '../../validators/auth/login/LogInValidation';
import type ILogin from '../../interfaces/auth/login/ILogin';


interface LoginFormProps {
  onClose: () => void;
  onRegisterClick: () => void;  // callback za otvaranje sign in forme
  onContinueAsGuest: () => void;
  onLoginSuccess: (user: User) => void; // prima user
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onRegisterClick, onContinueAsGuest, onLoginSuccess }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault(); // sprecava refresh stranice

    const loginValues: ILogin = { email, password };
    const validationErrors = validateLoginForm(loginValues);

    if (validationErrors.email || validationErrors.password) {
      setError(validationErrors.email || validationErrors.password || '');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        const user: User = data.user;

        onLoginSuccess(user);

        onClose();
      } else {
        // Prikaz greske
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('Greska servera');
    }
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
        value={email}
        onChange={e => setEmail(e.target.value)}
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
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      {error && <div style={styles.errorMessage}>{error}</div>}

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

        <button
          type="button"
          style={styles.optionButton}
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
    errorMessage: {
    color: 'red',
    fontWeight: '200',
    marginBottom: 8,
    textAlign: 'center',
  },
};

export default LoginForm;