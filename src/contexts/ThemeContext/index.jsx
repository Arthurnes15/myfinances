import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { themes } from './themes';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? themes.dark : themes.light;

  function toggleTheme() {
    localStorage.setItem('isDark', JSON.stringify(!isDark));
    localStorage.setItem('toggle', JSON.stringify(isDark));
    setIsDark(!isDark);
  }

  useEffect(() => {
    const isDark = localStorage.getItem('isDark') === 'true';
    setIsDark(isDark);
  }, []);

  return (
    <ThemeContext.Provider value={[{ theme, isDark }, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
