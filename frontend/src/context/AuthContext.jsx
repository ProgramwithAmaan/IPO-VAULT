import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await loadUser();
      } else {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const loadUser = async () => {
    try {
      console.log('🔄 Loading user...');
      const response = await api.get('/auth/me');
      if (response.data.success) {
        setUser(response.data.data);
        console.log('✅ User loaded:', response.data.data.email);
      } else {
        throw new Error('Failed to load user');
      }
    } catch (error) {
      console.error('❌ Load user error:', error);
      localStorage.removeItem('token');
      setToken(null);
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log('🔑 Attempting login:', email);
      const response = await api.post('/auth/login', { email, password });
      console.log('📥 Login response:', response.data);
      
      if (response.data.success) {
        const { token, ...userData } = response.data.data;
        localStorage.setItem('token', token);
        setToken(token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userData);
        toast.success('Welcome back! 🎉');
        console.log('✅ Login successful:', userData.email);
        return { success: true };
      }
      return { success: false, error: 'Login failed' };
    } catch (error) {
      console.error('❌ Login error:', error.response?.data || error.message);
      const message = error.response?.data?.error || 'Login failed. Please try again.';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (name, email, password) => {
    try {
      console.log('📝 Attempting registration:', { name, email });
      const response = await api.post('/auth/register', { name, email, password });
      console.log('📥 Registration response:', response.data);
      
      if (response.data.success) {
        const { token, ...userData } = response.data.data;
        localStorage.setItem('token', token);
        setToken(token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userData);
        toast.success('Account created successfully! 🎉');
        console.log('✅ Registration successful:', userData.email);
        return { success: true };
      }
      return { success: false, error: 'Registration failed' };
    } catch (error) {
      console.error('❌ Registration error:', error.response?.data || error.message);
      const message = error.response?.data?.error || 'Registration failed. Please try again.';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    toast.success('Logged out successfully');
    console.log('🚪 Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};