import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = mode === 'login'
      ? await login(formData.email, formData.password)
      : await register(formData.name, formData.email, formData.password);

    setLoading(false);

    if (result.success) {
      onClose();
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    } else {
      setError(result.error);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content max-w-md"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl hover:text-[var(--theme-accent)] transition-colors"
          style={{ color: 'var(--theme-textSecondary)' }}
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--theme-text)' }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--theme-textSecondary)' }}>
            {mode === 'login' 
              ? 'Sign in to track your IPO investments' 
              : 'Start tracking your IPO investments today'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 text-sm text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="John Doe"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          )}

          <button
            type="submit"
            className="btn-primary w-full py-3"
            disabled={loading}
          >
            {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setError('');
              setFormData({ name: '', email: '', password: '', confirmPassword: '' });
            }}
            className="text-sm hover:text-[var(--theme-accent)] transition-colors"
            style={{ color: 'var(--theme-textSecondary)' }}
          >
            {mode === 'login'
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Sign In'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;