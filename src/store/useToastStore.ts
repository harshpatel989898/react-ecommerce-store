import { create } from 'zustand';
import { ToastMessage } from '../types/user.types';
import { generateId } from '../utils/helpers';

interface ToastState {
  toasts: ToastMessage[];
  show: (toast: Omit<ToastMessage, 'id'>) => void;
  success: (title: string, message: string) => void;
  info: (title: string, message: string) => void;
  warning: (title: string, message: string) => void;
  error: (title: string, message: string) => void;
  remove: (id: string) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],

  show: (toast) => {
    const id = generateId('toast');
    const duration = toast.duration || 3500;
    const newToast: ToastMessage = { ...toast, id, duration };

    set((state) => ({ toasts: [...state.toasts, newToast] }));
  },

  success: (title, message) => {
    get().show({ type: 'success', title, message, icon: 'fa-check-circle' });
  },

  info: (title, message) => {
    get().show({ type: 'info', title, message, icon: 'fa-info-circle' });
  },

  warning: (title, message) => {
    get().show({ type: 'warning', title, message, icon: 'fa-exclamation-triangle' });
  },

  error: (title, message) => {
    get().show({ type: 'error', title, message, icon: 'fa-times-circle' });
  },

  remove: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },

  removeToast: (id) => {
    get().remove(id);
  },
}));
