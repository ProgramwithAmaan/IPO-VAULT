import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const LoginPage = () => {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
      if (!formData.name) {
        setError('Please enter your name');
        setLoading(false);
        return;
      }
    }

    try {
      console.log('🔄 Submitting form...');
      const result = mode === 'login'
        ? await login(formData.email, formData.password)
        : await register(formData.name, formData.email, formData.password);

      if (result.success) {
        console.log('✅ Authentication successful, redirecting...');
        navigate('/dashboard');
      } else {
        setError(result.error || 'Authentication failed');
        console.log('❌ Authentication failed:', result.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('❌ Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ 
      background: 'var(--theme-primary)',
      backgroundImage: 'radial-gradient(circle at top right, var(--theme-gradient), transparent 40%)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ background: 'var(--theme-accent)' }} />
            <h1 className="text-3xl font-extrabold" style={{ color: 'var(--theme-text)' }}>
              IPO <span style={{ color: 'var(--theme-accent)' }}>TRACKER</span>
            </h1>
          </div>
          <p className="text-sm" style={{ color: 'var(--theme-textSecondary)' }}>
            {mode === 'login' 
              ? 'Sign in to track your IPO investments' 
              : 'Create your account to start tracking'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-[var(--theme-secondary)] border border-[var(--theme-border)] rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6 text-center" style={{ color: 'var(--theme-text)' }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>

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
              className="btn-primary w-full py-3 text-base"
              disabled={loading}
            >
              {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-6">
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
        </div>

        {/* Footer */}
        <p className="text-xs text-center mt-6" style={{ color: 'var(--theme-textSecondary)' }}>
          IPO Tracker Pro v1.0 • Secure & Private
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;