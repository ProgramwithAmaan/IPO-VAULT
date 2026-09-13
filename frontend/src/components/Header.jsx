import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import MobileMenu from './MobileMenu';

const Header = ({ onAddClick, onExportExcel, onExportPDF }) => {
  const { currentTheme, themes, changeTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-dot" />
            <div>
              <div className="brand-name">
                IPO <span>VAULT</span>
                <span className="text-[10px] font-normal ml-2 px-2 py-0.5 rounded-full" style={{ 
                  background: 'var(--theme-card)',
                  color: 'var(--theme-textSecondary)',
                  border: '1px solid var(--theme-border)'
                }}>
                  PRO
                </span>
              </div>
              <div className="brand-subtitle">Track your IPO investments, selling prices & profits</div>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="header-actions desktop-only">
            {/* Theme Selector */}
            <div className="theme-selector">
              <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="btn-outline"
                style={{ minHeight: '38px', padding: '0 12px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <span>🎨</span>
                <span>Theme</span>
                <span 
                  className="w-3 h-3 rounded-full inline-block ml-1"
                  style={{ 
                    background: themes[currentTheme]?.preview || '#dc2626',
                    border: '1px solid var(--theme-border)'
                  }}
                />
              </button>
              <AnimatePresence>
                {isThemeOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="theme-dropdown open"
                    style={{ 
                      background: 'var(--theme-secondary)',
                      border: '1px solid var(--theme-border)',
                      minWidth: '180px'
                    }}
                  >
                    {Object.entries(themes).map(([key, theme]) => (
                      <button
                        key={key}
                        onClick={() => {
                          changeTheme(key);
                          setIsThemeOpen(false);
                        }}
                        className={`theme-option ${currentTheme === key ? 'active' : ''}`}
                        style={{
                          color: 'var(--theme-text)',
                          borderColor: currentTheme === key ? 'var(--theme-accent)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          width: '100%',
                          textAlign: 'left',
                          fontSize: '13px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span 
                          className="w-4 h-4 rounded-full flex-shrink-0"
                          style={{ 
                            background: theme.preview || '#dc2626',
                            border: '2px solid var(--theme-border)'
                          }}
                        />
                        {theme.name}
                        {currentTheme === key && (
                          <span className="ml-auto" style={{ color: 'var(--theme-accent)' }}>✓</span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={onAddClick} className="btn-primary">
              <span className="text-lg leading-none">+</span> Add IPO
            </button>
            <button onClick={onExportExcel} className="btn-outline">
              Export Excel
            </button>
            <button onClick={onExportPDF} className="btn-outline">
              Export PDF
            </button>

            {user && (
              <div className="flex items-center gap-3 ml-2">
                <span className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>
                  👋 {user.name || 'User'}
                </span>
                <button 
                  onClick={handleLogout} 
                  className="btn-outline text-sm" 
                  style={{ padding: '0 14px', minHeight: '34px' }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="mobile-only flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="btn-outline"
              style={{ padding: '8px 12px', minHeight: '38px' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onAddClick={onAddClick}
        onExportExcel={onExportExcel}
        onExportPDF={onExportPDF}
      />
    </>
  );
};

export default Header;
