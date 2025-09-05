import React, { useState } from 'react';
import './LoginForm.css';
import type { IAuthAPIService } from '../../../api/auth/IAuthAPIService';
import { useAuth } from '../../../hooks/auth/useAuthHook';
import type ILogin from '../../../interfaces/auth/login/ILogin';
import { validateLoginForm } from '../../../validators/auth/login/LogInValidation';

interface LoginFormProps {
  authService: IAuthAPIService;   // injected via props
  onClose: () => void;
  onRegisterClick: () => void;
  onContinueAsGuest: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  authService,
  onClose,
  onRegisterClick,
  onContinueAsGuest
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // koristi AuthProvider

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validacija polja
    const loginValues: ILogin = { email, password };
    const validationErrors = validateLoginForm(loginValues);

    if (validationErrors.email || validationErrors.password) {
      setError(validationErrors.email || validationErrors.password || '');
      return;
    }

    try {
      // Poziv API servisa
      const response = await authService.prijava(email, password);

      if (response.success && response.data) {
        // Čuvamo token u AuthProvider-u
        login(response.data);

        // Zatvori formu
        onClose();
      } else {
        setError(response.message || 'Neuspešan login');
      }
    } catch (err) {
      console.error(err);
      setError('Greška servera');
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
