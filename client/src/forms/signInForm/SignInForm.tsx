import React, { useState, type ChangeEvent } from 'react';
import './SignInForm.css'; // možeš preimenovati u SignUpForm.css
import CreateButton from '../../components/buttons/CreateButton';
import type { User } from '../../types/User';
import { users } from '../../types/User';
import type { FormValues, FormErrors } from '../../interfaces/auth/signin/IForms';
import { validateSignInForm } from '../../validators/auth/signin/SignInValidation';
import { IAuthService } from '../../services/IAuthService'; // <- ovde koristiš svoj servis

interface SignUpFormProps {
  onClose: () => void;
  onBackToLogin: () => void;
  onRegisterComplete: (user: User) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onClose, onBackToLogin, onRegisterComplete }) => {
  const [values, setValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phoneNumber: '',
    type: 'regular',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setValues(prev => ({ ...prev, profileImage: file || null }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl(null);
    }
    setErrors(prev => ({ ...prev, profileImage: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateSignInForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) return;

    const fullname = `${values.firstName} ${values.lastName}`;
    const isPremium = values.type === 'premium';

    try {
      // poziv servisa
      const userDto = await IAuthService.register(
        fullname,
        values.email,
        values.password,
        isPremium
      );

      // lokalno dodavanje u users (ako ti treba za demo)
      const newUser: User = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        dateOfBirth: values.dateOfBirth,
        phoneNumber: values.phoneNumber,
        type: values.type,
        imgSrc: imagePreviewUrl || 'https://i.pravatar.cc/150',
        messagesLeft: isPremium ? Infinity : 50,
      };
      users.push(newUser);

      onRegisterComplete(newUser);
      alert('User registered successfully!');
      onBackToLogin();
      onClose();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form className="signInForm" noValidate onSubmit={handleSubmit}>
      <button type="button" onClick={onBackToLogin} aria-label="Back to login" className="backButton">←</button>
      <h2 className="title">Create Account</h2>

      {/* ostatak forme ostaje isti */}
      ...
      <div className="buttonWrapper">
        <CreateButton />
      </div>
    </form>
  );
};

export default SignUpForm;
