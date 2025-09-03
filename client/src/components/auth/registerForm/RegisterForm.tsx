import React, { useState } from 'react';
import './RegisterForm.css';
import type { IAuthAPIService } from '../../../api/auth/IAuthAPIService';
import { useAuth } from '../../../hooks/auth/useAuthHook';

interface RegisterFormProps {
  authService: IAuthAPIService;   // injected via props
  onClose: () => void;
  onLoginClick: () => void;
  onContinueAsGuest: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  authService,
  onClose,
  onLoginClick,
  onContinueAsGuest
}) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullname.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await authService.registracija(fullname, email, password, isPremium);

      if (response.success && response.data) {
        login(response.data); // store JWT in auth context
        onClose();
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <form className="loginForm" noValidate onSubmit={handleSubmit}>
      <h2 className="loginFormTitle">Register</h2>

      <label htmlFor="fullname" className="loginFormLabel">Full Name</label>
      <input
        id="fullname"
        name="fullname"
        type="text"
        placeholder="Enter your full name"
        className="loginFormInput"
        required
        value={fullname}
        onChange={e => setFullname(e.target.value)}
      />

      <label htmlFor="email" className="loginFormLabel">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        className="loginFormInput"
        required
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
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <label className="loginFormLabel">
        <input
          type="checkbox"
          checked={isPremium}
          onChange={e => setIsPremium(e.target.checked)}
        />{' '}
        Premium Account
      </label>

      {error && <div className="loginError">{error}</div>}

      <button type="submit" className="loginButton">Register</button>

      <div className="loginOptions">
        <button type="button" className="loginOptionButton" onClick={onLoginClick}>Back to Login</button>
        <span className="loginSeparator">|</span>
        <button type="button" className="loginOptionButton" onClick={onContinueAsGuest}>Continue as Guest</button>
      </div>
    </form>
  );
};

export default RegisterForm;
