import { create } from 'zustand';
import { User } from '../types/user.types';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';
import { APP_CONSTANTS } from '../constants/app.constants';
import { AVATARS } from '../assets';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;

  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getStorageItem<User | null>(APP_CONSTANTS.STORAGE_KEYS.USER, {
    id: 'usr_demo',
    name: 'Alex Morgan',
    email: 'alex.morgan@auratech.io',
    avatar: AVATARS.alexMorgan,
    role: 'customer',
    createdAt: new Date().toISOString(),
  }),
  isAuthenticated: true,
  token: getStorageItem<string | null>(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN, 'demo_jwt_token_aura'),

  login: (user, token) => {
    set({ user, token, isAuthenticated: true });
    setStorageItem(APP_CONSTANTS.STORAGE_KEYS.USER, user);
    setStorageItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN, token);
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    removeStorageItem(APP_CONSTANTS.STORAGE_KEYS.USER);
    removeStorageItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
  },
}));
