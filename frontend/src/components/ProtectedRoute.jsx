import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--theme-primary)' }}>
        <div className="text-center">
          <div 
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto"
            style={{ borderColor: 'var(--theme-accent)', borderTopColor: 'transparent' }}
          />
          <p className="mt-4" style={{ color: 'var(--theme-textSecondary)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;