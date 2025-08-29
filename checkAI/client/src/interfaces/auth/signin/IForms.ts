// src/forms/signInForm/types.ts
export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  phoneNumber: string;
  profileImage: File | null;
  type: 'regular' | 'premium';
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  profileImage?: string;
}