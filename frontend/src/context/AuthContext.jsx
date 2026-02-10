import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Configure axios defaults
  axios.defaults.withCredentials = true;

  // Auto refresh token before expiry
  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated) {
        refreshToken();
      }
    }, 14 * 60 * 1000); // Refresh every 14 minutes (before 15 min expiry)

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/profile`);
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      if (error.response?.data?.expired) {
        await refreshToken();
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/refresh`);
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password
      });
      
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true, user: response.data.user };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const googleLogin = async (credentialResponse) => {
    try {
      const response = await axios.post(`${API_URL}/auth/google`, {
        token: credentialResponse.credential
      });
      
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true, user: response.data.user };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Google login failed'
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    register,
    login,
    googleLogin,
    logout,
    refreshToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
