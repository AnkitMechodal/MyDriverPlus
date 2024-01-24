// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext<any>();

export const useTheme = () => {
  // const context = useContext(ThemeContext);
  // if (!context) {
  //   throw new Error('useTheme must be used within a ThemeProvider');
  // }
  return useContext(ThemeContext);
};


export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState('light'); // Default Theme Set

  const toggleTheme = () => {
    setIsDarkMode((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const theme = {
    isDarkMode,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

