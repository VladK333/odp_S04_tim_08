// src/forms/loginForm/LogInValidation.ts
import type ILogin from '../../../interfaces/auth/login/ILogin';

export interface LoginErrors {
  email?: string;
  password?: string;
}

export function validateLoginForm(values: ILogin): LoginErrors {
  const errors: LoginErrors = {};

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email.trim())
  ) {
    errors.email = 'Email format is invalid.';
  }

  if (!values.password.trim()) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
}
