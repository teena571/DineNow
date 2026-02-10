import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    const result = await register(formData.name, formData.email, formData.password);
    
    if (result.success) {
      toast.success('Registration successful!');
      navigate('/');
    } else {
      toast.error(result.message);
    }
    
    setLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    
    const result = await googleLogin(credentialResponse);
    
    if (result.success) {
      toast.success('Google registration successful!');
      navigate('/');
    } else {
      toast.error(result.message);
    }
    
    setLoading(false);
  };

  const handleGoogleError = () => {
    toast.error('Google registration failed. Please try again.');
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-header">
          <h2 className="register-title">Create your account</h2>
          <p className="register-subtitle">
            Or{' '}
            <Link to="/login" className="register-link">
              sign in to existing account
            </Link>
          </p>
        </div>
        
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-fields">
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="form-input-register"
              placeholder="Full Name"
            />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="form-input-register"
              placeholder="Email address"
            />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="form-input-register"
              placeholder="Password (min 8 characters)"
            />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input-register"
              placeholder="Confirm Password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="register-button"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <div className="divider">
            <div className="divider-line">
              <div className="divider-border" />
            </div>
            <div className="divider-text">
              <span>Or continue with</span>
            </div>
          </div>

          <div className="google-login-wrapper">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              text="signup_with"
              shape="rectangular"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
