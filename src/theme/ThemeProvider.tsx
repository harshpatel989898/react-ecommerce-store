import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { ThemeContext, ThemeMode } from './themeContext';
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';
import { designTokens } from './tokens';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { APP_CONSTANTS } from '../constants/app.constants';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    return getStorageItem<ThemeMode>(APP_CONSTANTS.STORAGE_KEYS.THEME, 'dark');
  });

  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  };

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const resolvedTheme = useMemo<'light' | 'dark'>(() => {
    if (mode === 'system') return systemTheme;
    return mode;
  }, [mode, systemTheme]);

  const activeThemeSchema = resolvedTheme === 'light' ? lightTheme : darkTheme;

  // Apply CSS root variables dynamically
  useEffect(() => {
    const root = document.documentElement;
    
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // Bind color variables
    Object.entries(activeThemeSchema.colors).forEach(([key, val]) => {
      // Convert camelCase to kebab-case (e.g. textPrimary -> --color-text-primary)
      const cssVarName = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVarName, val);
    });
  }, [resolvedTheme, activeThemeSchema]);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    setStorageItem(APP_CONSTANTS.STORAGE_KEYS.THEME, newMode);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextMode = resolvedTheme === 'dark' ? 'light' : 'dark';
    setMode(nextMode);
  }, [resolvedTheme, setMode]);

  const contextValue = useMemo(
    () => ({
      mode,
      resolvedTheme,
      theme: activeThemeSchema,
      tokens: designTokens,
      setMode,
      toggleTheme,
    }),
    [mode, resolvedTheme, activeThemeSchema, setMode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
