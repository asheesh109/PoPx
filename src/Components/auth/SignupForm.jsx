import { useState, useEffect } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import { useTheme } from '../../Contexts/ThemeContext';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../common/Toast';
import { AvatarUpload } from '../common/AvatorUpload';
import { User, Mail, Phone, Building, Lock, Eye, EyeOff, ArrowLeft, ArrowRight } from 'lucide-react';
import './Auth.css';

export const SignupForm = () => {
  const { signup, isLoading, user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const validationRules = {
    fullName: { required: true, label: 'Full Name' },
    phone: { required: true, phone: true, label: 'Phone Number' },
    email: { required: true, email: true, label: 'Email Address' },
    password: { required: true, minLength: 6, label: 'Password' },
    company: { required: false, label: 'Company Name' }
  };

  const { values, errors, touched, handleChange, handleBlur, validateAll, setValues } = useFormValidation(
    {
      fullName: '',
      phone: '',
      email: '',
      password: '',
      company: '',
      isAgency: false,
      avatar: null
    },
    validationRules
  );

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleAvatarChange = (avatarData) => {
    setValues(prev => ({ ...prev, avatar: avatarData }));
  };

  const validateStep1 = () => {
    const step1Fields = ['fullName', 'phone', 'email', 'password'];
    const step1Errors = {};
    
    step1Fields.forEach(field => {
      const value = values[field];
      const rules = validationRules[field];
      
      if (rules.required && !value) {
        step1Errors[field] = `${rules.label} is required`;
      } else if (value) {
        if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          step1Errors[field] = 'Please enter a valid email address';
        } else if (rules.minLength && value.length < rules.minLength) {
          step1Errors[field] = `${rules.label} must be at least ${rules.minLength} characters`;
        } else if (rules.phone && !/^\+?[\d\s-()]+$/.test(value)) {
          step1Errors[field] = 'Please enter a valid phone number';
        }
      }
    });
    
    return Object.keys(step1Errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateAll()) {
      setToast({ message: 'Please complete all required fields correctly', type: 'error' });
      return;
    }

    const result = await signup(values);
    
    if (result.success) {
      setToast({ 
        message: 'Account created successfully! Redirecting...', 
        type: 'success',
        duration: 1500
      });
      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setToast({ message: result.error || 'Failed to create account', type: 'error' });
    }
  };

  const nextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    } else {
      // Trigger validation for all step 1 fields
      ['fullName', 'phone', 'email', 'password'].forEach(field => handleBlur(field));
      setToast({ message: 'Please complete all required fields correctly', type: 'error' });
    }
  };

  const previousStep = () => {
    setCurrentStep(1);
  };

  return (
    <div className={`auth-container ${isDark ? 'dark' : ''}`}>
      {/* Toast positioned at the top */}
      <div className="toast-container">
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)}
            duration={toast.duration}
          />
        )}
      </div>
      
      <div className="auth-card signup-card">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="logo-circle">
              <span>P</span>
            </div>
            <h1>PopX</h1>
          </div>
          <h2>Create your account</h2>
          <p>Join thousands of users already growing with PopX</p>
          
          <div className="progress-indicator">
            <div className="progress-steps">
              <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                <span>1</span>
                <p>Basic Info</p>
              </div>
              <div className="progress-line"></div>
              <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                <span>2</span>
                <p>Profile</p>
              </div>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${(currentStep / 2) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {currentStep === 1 ? (
            <>
              <div className="input-group">
                <label htmlFor="fullName">Full name</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={20} />
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={values.fullName}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    placeholder="Enter your full name"
                    className={errors.fullName && touched.fullName ? 'error' : ''}
                    required
                    autoComplete="name"
                  />
                </div>
                {errors.fullName && touched.fullName && (
                  <span className="error-message">{errors.fullName}</span>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="phone">Phone number</label>
                <div className="input-wrapper">
                  <Phone className="input-icon" size={20} />
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={values.phone}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    placeholder="Enter your phone number"
                    className={errors.phone && touched.phone ? 'error' : ''}
                    required
                    autoComplete="tel"
                  />
                </div>
                {errors.phone && touched.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="email">Email address</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={20} />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="Enter your email"
                    className={errors.email && touched.email ? 'error' : ''}
                    required
                    autoComplete="email"
                  />
                </div>
                {errors.email && touched.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={values.password}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    onBlur={() => handleBlur('password')}
                    placeholder="Create a strong password"
                    className={errors.password && touched.password ? 'error' : ''}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <span className="error-message">{errors.password}</span>
                )}
                <div className="password-requirements">
                  <p>Password must be at least 6 characters long</p>
                </div>
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="auth-button"
              >
                Continue
                <ArrowRight size={20} />
              </button>
            </>
          ) : (
            <>
              <div className="avatar-section">
                <AvatarUpload 
                  avatar={values.avatar}
                  onAvatarChange={handleAvatarChange}
                />
                <div className="avatar-text">
                  <h3>Add your photo</h3>
                  <p>Help others recognize you</p>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="company">Company name (optional)</label>
                <div className="input-wrapper">
                  <Building className="input-icon" size={20} />
                  <input
                    id="company"
                    type="text"
                    name="company"
                    value={values.company}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    onBlur={() => handleBlur('company')}
                    placeholder="Enter your company name"
                    className={errors.company && touched.company ? 'error' : ''}
                    autoComplete="organization"
                  />
                </div>
                {errors.company && touched.company && (
                  <span className="error-message">{errors.company}</span>
                )}
              </div>

              <div className="radio-group">
                <label className="radio-label">Are you an agency?</label>
                <div className="radio-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="isAgency"
                      checked={values.isAgency === true}
                      onChange={() => handleChange('isAgency', true)}
                    />
                    <span className="radio-custom"></span>
                    <span>Yes, I represent an agency</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="isAgency"
                      checked={values.isAgency === false}
                      onChange={() => handleChange('isAgency', false)}
                    />
                    <span className="radio-custom"></span>
                    <span>No, I'm an individual</span>
                  </label>
                </div>
              </div>

              <div className="button-group">
                <button
                  type="button"
                  onClick={previousStep}
                  className="auth-button secondary"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
                <button
                  type="submit"
                  className={`auth-button ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      Creating account...
                    </>
                  ) : (
                    'Create account'
                  )}
                </button>
              </div>
            </>
          )}
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="switch-form-button"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>

      <div className="auth-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </div>
  );
};