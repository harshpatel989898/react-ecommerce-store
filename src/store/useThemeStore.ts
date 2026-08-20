import { create } from 'zustand';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { APP_CONSTANTS } from '../constants/app.constants';

type Theme = 'dark' | 'light';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: getStorageItem<Theme>(APP_CONSTANTS.STORAGE_KEYS.THEME, 'dark'),

  toggleTheme: () => {
    const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
    set({ theme: nextTheme });
    setStorageItem(APP_CONSTANTS.STORAGE_KEYS.THEME, nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
}));
