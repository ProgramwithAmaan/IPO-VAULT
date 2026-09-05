import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MobileMenu = ({ isOpen, onClose, onAddClick, onExportExcel, onExportPDF }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    onClose();
  };

  const menuItems = [
    { icon: '➕', label: 'Add IPO', action: onAddClick },
    { icon: '📊', label: 'Export Excel', action: onExportExcel },
    { icon: '📄', label: 'Export PDF', action: onExportPDF },
  ];

  if (user) {
    menuItems.push({ 
      icon: '👤', 
      label: user.name || 'Profile', 
      action: () => {},
      isProfile: true
    });
    menuItems.push({ 
      icon: '🚪', 
      label: 'Logout', 
      action: handleLogout,
      danger: true 
    });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="absolute top-0 right-0 h-full w-72 bg-[var(--theme-secondary)] border-l border-[var(--theme-border)] shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="p-6 border-b border-[var(--theme-border)]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg" style={{ color: 'var(--theme-text)' }}>
                    IPO <span style={{ color: 'var(--theme-accent)' }}>TRACKER</span>
                  </h3>
                  {user && (
                    <p className="text-sm mt-1" style={{ color: 'var(--theme-textSecondary)' }}>
                      👋 Welcome, {user.name}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="text-2xl hover:text-[var(--theme-accent)] transition-colors"
                  style={{ color: 'var(--theme-textSecondary)' }}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-4 space-y-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={index}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-[var(--theme-card)] ${
                    item.isProfile ? 'border border-[var(--theme-border)]' : ''
                  }`}
                  style={{ 
                    color: item.danger ? '#ef4444' : 'var(--theme-text)',
                    border: item.isProfile ? '1px solid var(--theme-border)' : '1px solid transparent'
                  }}
                  whileHover={{ 
                    borderColor: item.danger ? '#ef4444' : 'var(--theme-accent)',
                    x: 4 
                  }}
                  onClick={() => {
                    item.action();
                    if (!item.danger && !item.isProfile) onClose();
                  }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                  {item.isProfile && (
                    <span className="ml-auto text-xs" style={{ color: 'var(--theme-textSecondary)' }}>
                      ✓
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--theme-border)]">
              <p className="text-xs text-center" style={{ color: 'var(--theme-textSecondary)' }}>
                IPO Tracker Pro v1.0
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;