import { createContext } from 'react';
import { ThemeSchema } from './lightTheme';
import { DesignTokens } from './tokens';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  mode: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  theme: ThemeSchema;
  tokens: DesignTokens;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
