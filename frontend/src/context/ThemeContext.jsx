// import React, { createContext, useState, useContext, useEffect } from 'react';

// const ThemeContext = createContext();

// const themes = {
//   dark: {
//     name: 'Dark',
//     primary: '#0a0a0a',
//     secondary: '#111111',
//     card: '#141414',
//     border: '#2a2a2a',
//     text: '#ffffff',
//     textSecondary: '#9a9a9a',
//     accent: '#dc2626',
//     accentHover: '#b91c1c',
//     shadow: 'rgba(220, 38, 38, 0.15)',
//     gradient: 'rgba(220, 38, 38, 0.03)',
//   },
//   'dark-blue': {
//     name: 'Dark Blue',
//     primary: '#0a0e1a',
//     secondary: '#111827',
//     card: '#1a2332',
//     border: '#2d3a4a',
//     text: '#ffffff',
//     textSecondary: '#94a3b8',
//     accent: '#3b82f6',
//     accentHover: '#2563eb',
//     shadow: 'rgba(59, 130, 246, 0.15)',
//     gradient: 'rgba(59, 130, 246, 0.03)',
//   },
//   'dark-purple': {
//     name: 'Dark Purple',
//     primary: '#0a0a1a',
//     secondary: '#1a1030',
//     card: '#2a1a40',
//     border: '#3a2a50',
//     text: '#ffffff',
//     textSecondary: '#a78bfa',
//     accent: '#8b5cf6',
//     accentHover: '#7c3aed',
//     shadow: 'rgba(139, 92, 246, 0.15)',
//     gradient: 'rgba(139, 92, 246, 0.03)',
//   },
//   'dark-green': {
//     name: 'Dark Green',
//     primary: '#0a1a0a',
//     secondary: '#112811',
//     card: '#1a3a1a',
//     border: '#2a4a2a',
//     text: '#ffffff',
//     textSecondary: '#86efac',
//     accent: '#22c55e',
//     accentHover: '#16a34a',
//     shadow: 'rgba(34, 197, 94, 0.15)',
//     gradient: 'rgba(34, 197, 94, 0.03)',
//   },
//   'dark-gold': {
//     name: 'Dark Gold',
//     primary: '#1a140a',
//     secondary: '#2a1f0a',
//     card: '#3a2a0a',
//     border: '#4a3a1a',
//     text: '#ffffff',
//     textSecondary: '#fcd34d',
//     accent: '#f59e0b',
//     accentHover: '#d97706',
//     shadow: 'rgba(245, 158, 11, 0.15)',
//     gradient: 'rgba(245, 158, 11, 0.03)',
//   },
//   light: {
//     name: 'Light',
//     primary: '#f0f0f0',
//     secondary: '#ffffff',
//     card: '#ffffff',
//     border: '#d1d5db',
//     text: '#111827',
//     textSecondary: '#6b7280',
//     accent: '#dc2626',
//     accentHover: '#b91c1c',
//     shadow: 'rgba(0, 0, 0, 0.1)',
//     gradient: 'rgba(220, 38, 38, 0.05)',
//   },
// };

// export const ThemeProvider = ({ children }) => {
//   const [currentTheme, setCurrentTheme] = useState(() => {
//     const saved = localStorage.getItem('theme');
//     return saved || 'dark';
//   });

//   useEffect(() => {
//     localStorage.setItem('theme', currentTheme);
//     document.documentElement.setAttribute('data-theme', currentTheme);
    
//     // Apply theme colors to CSS variables
//     const theme = themes[currentTheme];
//     Object.entries(theme).forEach(([key, value]) => {
//       document.documentElement.style.setProperty(`--theme-${key}`, value);
//     });
//   }, [currentTheme]);

//   const changeTheme = (themeName) => {
//     if (themes[themeName]) {
//       setCurrentTheme(themeName);
//     }
//   };

//   return (
//     <ThemeContext.Provider value={{ currentTheme, themes, changeTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };




import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  dark: {
    name: 'Dark Red',
    primary: '#0a0a0a',
    secondary: '#111111',
    card: '#141414',
    border: '#2a2a2a',
    text: '#ffffff',
    textSecondary: '#9a9a9a',
    accent: '#dc2626',
    accentHover: '#b91c1c',
    shadow: 'rgba(220, 38, 38, 0.15)',
    gradient: 'rgba(220, 38, 38, 0.03)',
    rgb: { accent: '220, 38, 38' },
    preview: '#dc2626'
  },
  'dark-blue': {
    name: 'Dark Blue',
    primary: '#0a0e1a',
    secondary: '#111827',
    card: '#1a2332',
    border: '#2d3a4a',
    text: '#ffffff',
    textSecondary: '#94a3b8',
    accent: '#3b82f6',
    accentHover: '#2563eb',
    shadow: 'rgba(59, 130, 246, 0.15)',
    gradient: 'rgba(59, 130, 246, 0.03)',
    rgb: { accent: '59, 130, 246' },
    preview: '#3b82f6'
  },
  'dark-purple': {
    name: 'Dark Purple',
    primary: '#0a0a1a',
    secondary: '#1a1030',
    card: '#2a1a40',
    border: '#3a2a50',
    text: '#ffffff',
    textSecondary: '#a78bfa',
    accent: '#8b5cf6',
    accentHover: '#7c3aed',
    shadow: 'rgba(139, 92, 246, 0.15)',
    gradient: 'rgba(139, 92, 246, 0.03)',
    rgb: { accent: '139, 92, 246' },
    preview: '#8b5cf6'
  },
  'dark-green': {
    name: 'Dark Green',
    primary: '#0a1a0a',
    secondary: '#112811',
    card: '#1a3a1a',
    border: '#2a4a2a',
    text: '#ffffff',
    textSecondary: '#86efac',
    accent: '#22c55e',
    accentHover: '#16a34a',
    shadow: 'rgba(34, 197, 94, 0.15)',
    gradient: 'rgba(34, 197, 94, 0.03)',
    rgb: { accent: '34, 197, 94' },
    preview: '#22c55e'
  },
  'dark-gold': {
    name: 'Dark Gold',
    primary: '#1a140a',
    secondary: '#2a1f0a',
    card: '#3a2a0a',
    border: '#4a3a1a',
    text: '#ffffff',
    textSecondary: '#fcd34d',
    accent: '#f59e0b',
    accentHover: '#d97706',
    shadow: 'rgba(245, 158, 11, 0.15)',
    gradient: 'rgba(245, 158, 11, 0.03)',
    rgb: { accent: '245, 158, 11' },
    preview: '#f59e0b'
  },
  light: {
    name: 'Light',
    primary: '#f0f0f0',
    secondary: '#ffffff',
    card: '#ffffff',
    border: '#d1d5db',
    text: '#111827',
    textSecondary: '#6b7280',
    accent: '#dc2626',
    accentHover: '#b91c1c',
    shadow: 'rgba(0, 0, 0, 0.1)',
    gradient: 'rgba(220, 38, 38, 0.05)',
    rgb: { accent: '220, 38, 38' },
    preview: '#dc2626'
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    const theme = themes[currentTheme];
    if (theme) {
      // Apply theme colors to CSS variables
      const root = document.documentElement;
      Object.entries(theme).forEach(([key, value]) => {
        if (key !== 'name' && key !== 'preview' && key !== 'rgb') {
          root.style.setProperty(`--theme-${key}`, value);
        }
        if (key === 'rgb' && value) {
          Object.entries(value).forEach(([rgbKey, rgbValue]) => {
            root.style.setProperty(`--theme-${rgbKey}-rgb`, rgbValue);
          });
        }
      });
      
      // Set accent color for RGB usage
      root.style.setProperty('--theme-accent-rgb', theme.rgb?.accent || '220, 38, 38');
    }
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, themes, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};