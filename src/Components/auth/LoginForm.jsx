import { useState, useEffect } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import { useTheme } from '../../Contexts/ThemeContext';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../common/Toast';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './Auth.css';

export const LoginForm = () => {
  const { login, isLoading, user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const validationRules = {
    email: { required: true, email: true, label: 'Email' },
    password: { required: true, minLength: 6, label: 'Password' }
  };

  const { values, errors, touched, handleChange, handleBlur, validateAll } = useFormValidation(
    { email: '', password: '' },
    validationRules
  );

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateAll()) {
      setToast({ message: 'Please fix the errors above', type: 'error' });
      return;
    }

    const result = await login(values);
    
    if (result.success) {
      setToast({ 
        message: 'Welcome back! Redirecting...', 
        type: 'success',
        duration: 1500
      });
      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setToast({ message: result.error || 'Invalid credentials', type: 'error' });
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setToast({ 
      message: 'Password reset functionality will be available soon!', 
      type: 'info' 
    });
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
      
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="logo-circle">
              <span>P</span>
            </div>
            <h1>PopX</h1>
          </div>
          <h2>Welcome back</h2>
          <p>Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="Enter your password"
                className={errors.password && touched.password ? 'error' : ''}
                required
                autoComplete="current-password"
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
          </div>

          <div className="forgot-password">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="forgot-link"
            >
              Forgot your password?
            </button>
          </div>

          <button
            type="submit"
            className={`auth-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="switch-form-button"
            >
              Create account
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