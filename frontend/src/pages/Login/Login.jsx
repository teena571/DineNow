import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      toast.success('Login successful!');
      
      // Redirect based on role
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else if (result.user.role === 'staff') {
        navigate('/kitchen');
      } else {
        navigate('/');
      }
    } else {
      toast.error(result.message);
    }
    
    setLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    
    const result = await googleLogin(credentialResponse);
    
    if (result.success) {
      toast.success('Google login successful!');
      
      // Redirect based on role
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else if (result.user.role === 'staff') {
        navigate('/kitchen');
      } else {
        navigate('/');
      }
    } else {
      toast.error(result.message);
    }
    
    setLoading(false);
  };

  const handleGoogleError = () => {
    toast.error('Google login failed. Please try again.');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2 className="login-title">Sign in to DineNow</h2>
          <p className="login-subtitle">
            Or{' '}
            <Link to="/register" className="login-link">
              create a new account
            </Link>
          </p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Email address"
              style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
            />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Password"
              style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 'none' }}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

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
              useOneTap
              theme="outline"
              size="large"
              text="signin_with"
              shape="rectangular"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
