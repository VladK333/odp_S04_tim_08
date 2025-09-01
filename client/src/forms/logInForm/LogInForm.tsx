import React, { useState } from 'react';
import type { User } from '../../types/User';
import { validateLoginForm } from '../../validators/auth/login/LogInValidation';
import type ILogin from '../../interfaces/auth/login/ILogin';
import './LoginForm.css';

interface LoginFormProps {
  onClose: () => void;
  onRegisterClick: () => void;
  onContinueAsGuest: () => void;
  onLoginSuccess: (user: User) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onRegisterClick, onContinueAsGuest, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        onLoginSuccess(data.user);
        onClose();
      } else {
        setError(data.message);
      }
    } catch {
      setError('Greska servera');
    }
  };

  return (
    <form className="loginForm" noValidate onSubmit={handleSubmit}>
      <h2 className="loginFormTitle">Login</h2>

      <label htmlFor="email" className="loginFormLabel">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        className="loginFormInput"
        required
        autoComplete="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <label htmlFor="password" className="loginFormLabel">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Enter your password"
        className="loginFormInput"
        required
        autoComplete="current-password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      {error && <div className="loginError">{error}</div>}

      <button type="submit" className="loginButton">Log In</button>

      <div className="loginOptions">
        <button type="button" className="loginOptionButton" onClick={onRegisterClick}>Register</button>
        <span className="loginSeparator">|</span>
        <button type="button" className="loginOptionButton" onClick={onContinueAsGuest}>Continue as Guest</button>
      </div>
    </form>
  );
};

export default LoginForm;
