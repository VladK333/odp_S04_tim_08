import React, { useState, type ChangeEvent } from 'react';
import './SignInForm.css';
import CreateButton from '../../components/buttons/CreateButton';
import type { User } from '../../types/User';
import { users } from '../../types/User';
import type { FormValues, FormErrors } from '../../interfaces/auth/signin/IForms';
import { validateSignInForm } from '../../validators/auth/signin/SignInValidation';
import { signUp } from '../../api/authApi';

interface SignInFormProps {
  onClose: () => void;
  onBackToLogin: () => void;
  onRegisterComplete: (user: User) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onClose, onBackToLogin, onRegisterComplete }) => {
  const [values, setValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phoneNumber: '',
    profileImage: null,
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

    const newUser: User = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      dateOfBirth: values.dateOfBirth,
      phoneNumber: values.phoneNumber,
      type: values.type,
      imgSrc: imagePreviewUrl || 'https://i.pravatar.cc/150',
      messagesLeft: values.type === 'premium' ? Infinity : 50,
    };

    users.push(newUser);
    onRegisterComplete(newUser);

    try {
      await signUp({
        email: values.email,
        password: values.password,
        type: values.type,
        firstName: values.firstName,
        lastName: values.lastName,
        dateOfBirth: values.dateOfBirth,
        phoneNumber: values.phoneNumber,
        imgSrc: imagePreviewUrl || '',
      });

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

      <div className="contentWrapper">
        <div className="imageContainer">
          {imagePreviewUrl ? (
            <img src={imagePreviewUrl} alt="Profile preview" className="imagePreview" />
          ) : (
            <div className="imagePlaceholder">No image selected</div>
          )}
          <label htmlFor="profileImage" className="fileLabel">Choose Image</label>
          <input
            id="profileImage"
            name="profileImage"
            type="file"
            accept="image/*"
            className="fileInput"
            onChange={handleImageChange}
            aria-invalid={!!errors.profileImage}
            aria-describedby="profileImage-error"
          />
          {errors.profileImage && <div id="profileImage-error" className="errorText">{errors.profileImage}</div>}

          <label htmlFor="type" className="label" style={{ marginTop: 20 }}>Account Type</label>
          <select id="type" name="type" value={values.type} onChange={handleChange} className="select">
            <option value="regular">Regular</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        <div className="fieldsContainer">
          <div className="column">
            <label htmlFor="firstName" className="label">First Name</label>
            <input id="firstName" name="firstName" type="text" placeholder="Enter your first name"
              className="input" style={{ borderColor: errors.firstName ? '#d32f2f' : '#d252bdff' }}
              value={values.firstName} onChange={handleChange} autoComplete="given-name"
              aria-invalid={!!errors.firstName} aria-describedby="firstName-error" />
            {errors.firstName && <div id="firstName-error" className="errorText">{errors.firstName}</div>}

            <label htmlFor="email" className="label">Email</label>
            <input id="email" name="email" type="email" placeholder="Enter your email"
              className="input" style={{ borderColor: errors.email ? '#d32f2f' : '#d252bdff' }}
              value={values.email} onChange={handleChange} autoComplete="email"
              aria-invalid={!!errors.email} aria-describedby="email-error" />
            {errors.email && <div id="email-error" className="errorText">{errors.email}</div>}

            <label htmlFor="phoneNumber" className="label">Phone Number</label>
            <input id="phoneNumber" name="phoneNumber" type="tel" placeholder="Enter your phone number"
              className="input" style={{ borderColor: errors.phoneNumber ? '#d32f2f' : '#d252bdff' }}
              value={values.phoneNumber} onChange={handleChange} autoComplete="tel"
              aria-invalid={!!errors.phoneNumber} aria-describedby="phoneNumber-error" />
            {errors.phoneNumber && <div id="phoneNumber-error" className="errorText">{errors.phoneNumber}</div>}
          </div>

          <div className="column">
            <label htmlFor="lastName" className="label">Last Name</label>
            <input id="lastName" name="lastName" type="text" placeholder="Enter your last name"
              className="input" style={{ borderColor: errors.lastName ? '#d32f2f' : '#d252bdff' }}
              value={values.lastName} onChange={handleChange} autoComplete="family-name"
              aria-invalid={!!errors.lastName} aria-describedby="lastName-error" />
            {errors.lastName && <div id="lastName-error" className="errorText">{errors.lastName}</div>}

            <label htmlFor="password" className="label">Password</label>
            <input id="password" name="password" type="password" placeholder="Enter your password"
              className="input" style={{ borderColor: errors.password ? '#d32f2f' : '#d252bdff' }}
              value={values.password} onChange={handleChange} autoComplete="new-password"
              aria-invalid={!!errors.password} aria-describedby="password-error" />
            {errors.password && <div id="password-error" className="errorText">{errors.password}</div>}

            <label htmlFor="dateOfBirth" className="label">Date of Birth</label>
            <input id="dateOfBirth" name="dateOfBirth" type="date"
              max={new Date().toISOString().split("T")[0]} className="input"
              style={{ borderColor: errors.dateOfBirth ? '#d32f2f' : '#d252bdff' }}
              value={values.dateOfBirth} onChange={handleChange}
              aria-invalid={!!errors.dateOfBirth} aria-describedby="dateOfBirth-error" />
            {errors.dateOfBirth && <div id="dateOfBirth-error" className="errorText">{errors.dateOfBirth}</div>}
          </div>
        </div>
      </div>

      <div className="buttonWrapper">
        <CreateButton />
      </div>
    </form>
  );
};

export default SignInForm;
