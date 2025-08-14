// src/forms/signInForm/SignInForm.tsx
import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import CreateButton from '../../components/buttons/CreateButton';

interface SignInFormProps {
  onClose: () => void;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  phoneNumber: string;
  profileImage: File | null;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  profileImage?: string;
}

const SignInForm: React.FC<SignInFormProps> = ({ onClose }) => {
  const [values, setValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phoneNumber: '',
    profileImage: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const validate = (): FormErrors => {
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setValues((prev) => ({
      ...prev,
      profileImage: file || null,
    }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onClose();
    }
  };

  return (
    <form style={styles.form} noValidate onSubmit={handleSubmit}>
      <h2 style={styles.title}>Create Account</h2>

      <div style={styles.contentWrapper}>
        {/* Left side: Image preview or placeholder */}
        <div style={styles.imageContainer}>
          {imagePreviewUrl ? (
            <img
              src={imagePreviewUrl}
              alt="Profile preview"
              style={styles.imagePreview}
            />
          ) : (
            <div style={styles.imagePlaceholder}>No image selected</div>
          )}
          <label htmlFor="profileImage" style={styles.fileLabel}>
            Choose Image
          </label>
          <input
            id="profileImage"
            name="profileImage"
            type="file"
            accept="image/*"
            style={styles.fileInput}
            onChange={handleImageChange}
            aria-invalid={!!errors.profileImage}
            aria-describedby="profileImage-error"
          />
          {errors.profileImage && (
            <div id="profileImage-error" style={styles.errorText}>
              {errors.profileImage}
            </div>
          )}
        </div>

        {/* Right side: Two columns of inputs */}
        <div style={styles.fieldsContainer}>
          {/* First column: firstName, email, phoneNumber */}
          <div style={styles.column}>
            <label htmlFor="firstName" style={styles.label}>
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              style={styles.input}
              value={values.firstName}
              onChange={handleChange}
              autoComplete="given-name"
              aria-invalid={!!errors.firstName}
              aria-describedby="firstName-error"
            />
            {errors.firstName && (
              <div id="firstName-error" style={styles.errorText}>
                {errors.firstName}
              </div>
            )}

            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              style={styles.input}
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {errors.email && (
              <div id="email-error" style={styles.errorText}>
                {errors.email}
              </div>
            )}

            <label htmlFor="phoneNumber" style={styles.label}>
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              style={styles.input}
              value={values.phoneNumber}
              onChange={handleChange}
              autoComplete="tel"
              aria-invalid={!!errors.phoneNumber}
              aria-describedby="phoneNumber-error"
            />
            {errors.phoneNumber && (
              <div id="phoneNumber-error" style={styles.errorText}>
                {errors.phoneNumber}
              </div>
            )}
          </div>

          {/* Second column: lastName, password, dateOfBirth */}
          <div style={styles.column}>
            <label htmlFor="lastName" style={styles.label}>
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              style={styles.input}
              value={values.lastName}
              onChange={handleChange}
              autoComplete="family-name"
              aria-invalid={!!errors.lastName}
              aria-describedby="lastName-error"
            />
            {errors.lastName && (
              <div id="lastName-error" style={styles.errorText}>
                {errors.lastName}
              </div>
            )}

            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              style={styles.input}
              value={values.password}
              onChange={handleChange}
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
            />
            {errors.password && (
              <div id="password-error" style={styles.errorText}>
                {errors.password}
              </div>
            )}

            <label htmlFor="dateOfBirth" style={styles.label}>
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              style={styles.input}
              value={values.dateOfBirth}
              onChange={handleChange}
              aria-invalid={!!errors.dateOfBirth}
              aria-describedby="dateOfBirth-error"
            />
            {errors.dateOfBirth && (
              <div id="dateOfBirth-error" style={styles.errorText}>
                {errors.dateOfBirth}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={styles.buttonWrapper}>
        <CreateButton />
      </div>
    </form>
  );
};

const styles: Record<string, React.CSSProperties> = {
  form: {
    maxWidth: 1000,
    width: '100%',
    margin: '0 auto',
    padding: 40,
    borderRadius: 16,
    backgroundColor: '#f9f7fa',
    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },
  title: {
    marginBottom: 32,
    fontSize: 32,
    fontWeight: '700',
    color: '#6a2c70',
    textAlign: 'center',
  },
  contentWrapper: {
    display: 'flex',
    gap: 40,
  },
  imageContainer: {
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 160,
  },
  imagePreview: {
    width: 140,
    height: 140,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2.5px solid #cd55abff',
    marginBottom: 12,
  },
  imagePlaceholder: {
    width: 140,
    height: 140,
    borderRadius: '50%',
    border: '2.5px dashed #cd55abff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#cd55abff',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
    padding: 10,
  },
  fileLabel: {
    cursor: 'pointer',
    backgroundColor: '#6a2c70',
    color: 'white',
    padding: '8px 14px',
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 14,
    userSelect: 'none',
    boxShadow: '0 3px 10px rgba(106,44,112,0.8)',
    transition: 'background-color 0.3s ease',
    textAlign: 'center',
    width: '100%',
  },
  fileInput: {
    display: 'none',
  },
  fieldsContainer: {
    flex: 1,
    display: 'flex',
    gap: 40,
  },
  column: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: 8,
    fontWeight: 600,
    fontSize: 15,
    color: '#333',
  },
  input: {
    marginBottom: 22,
    padding: '14px 18px',
    borderRadius: 10,
    border: '1.5px solid #cd55abff',
    fontSize: 16,
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    marginTop: -16,
    marginBottom: 16,
  },
  buttonWrapper: {
    marginTop: 32,
    display: 'flex',
    justifyContent: 'center',
  },
};

export default SignInForm;