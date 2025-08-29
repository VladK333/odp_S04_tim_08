// src/forms/signInForm/SignInValidation.tsx
import type { FormValues, FormErrors } from '../../../interfaces/auth/signin/IForms';

export function validateSignInForm(values: FormValues): FormErrors {
  const newErrors: FormErrors = {};

  if (!values.firstName.trim()) {
    newErrors.firstName = 'First name is required.';
  }

  if (!values.lastName.trim()) {
    newErrors.lastName = 'Last name is required.';
  }

  if (!values.email.trim()) {
    newErrors.email = 'Email is required.';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email.trim())
  ) {
    newErrors.email = 'Email format is invalid.';
  }

  if (!values.password) {
    newErrors.password = 'Password is required.';
  } else if (values.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters.';
  }

  if (!values.dateOfBirth) {
    newErrors.dateOfBirth = 'Date of birth is required.';
  }

  if (!values.phoneNumber.trim()) {
    newErrors.phoneNumber = 'Phone number is required.';
  } else if (
    !/^\+?\d{6,15}$/.test(values.phoneNumber.trim())
  ) {
    newErrors.phoneNumber = 'Phone number format is invalid.';
  }

  if (values.profileImage) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(values.profileImage.type)) {
      newErrors.profileImage = 'Only JPG, PNG, and GIF images are allowed.';
    }
    const maxSizeMB = 5;
    if (values.profileImage.size > maxSizeMB * 1024 * 1024) {
      newErrors.profileImage = `Image size must be less than ${maxSizeMB}MB.`;
    }
  }

  return newErrors;
}