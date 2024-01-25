import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextProps {
  isDarkMode: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState('dark'); // Default Theme Set

  const toggleTheme = () => {
    setIsDarkMode((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const theme: ThemeContextProps = {
    isDarkMode,
    toggleTheme,
  };

  // useEffect(() => {
  //   const checkTheme = async () => {
  //     try {
  //       const storedThemeId = await AsyncStorage.getItem('user_theme');
  //       console.log('ThemeProvider=====>:', storedThemeId);
  //       if (storedThemeId === 'dark') {
  //         console.log('1:' + storedThemeId);
  //         setIsDarkMode('dark');
  //         // setIsDarkMode((prevTheme) => (prevTheme === 'light' ? 'dark' : 'dark'));
  //       } else {
  //         console.log('2:' + storedThemeId);
  //         setIsDarkMode('light');
  //       }
  //     } catch (error) {
  //       console.error('Error checking theme:', error);
  //     }
  //   };

  //   checkTheme(); // Call the asynchronous function
  // }, []);


  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
