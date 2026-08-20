import { create } from 'zustand';
import { Product } from '../types/product.types';
import { APP_CONSTANTS } from '../constants/app.constants';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { useToastStore } from './useToastStore';

interface WishlistState {
  items: Product[];
  isDrawerOpen: boolean;

  toggleWishlist: (product: Product) => boolean;
  isInWishlist: (productId: string) => boolean;
  removeItem: (productId: string) => void;

  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: getStorageItem<Product[]>(APP_CONSTANTS.STORAGE_KEYS.WISHLIST, []),
  isDrawerOpen: false,

  toggleWishlist: (product) => {
    const current = get().items;
    const exists = current.some((item) => item.id === product.id);

    let updated: Product[];
    if (exists) {
      updated = current.filter((item) => item.id !== product.id);
      useToastStore.getState().info('Removed from Wishlist', `${product.name} removed from your saved items.`);
    } else {
      updated = [...current, product];
      useToastStore.getState().success('Added to Wishlist!', `${product.name} saved to your favorites.`);
    }

    set({ items: updated });
    setStorageItem(APP_CONSTANTS.STORAGE_KEYS.WISHLIST, updated);
    return !exists;
  },

  isInWishlist: (productId) => {
    return get().items.some((item) => item.id === productId);
  },

  removeItem: (productId) => {
    const current = get().items;
    const updated = current.filter((item) => item.id !== productId);
    set({ items: updated });
    setStorageItem(APP_CONSTANTS.STORAGE_KEYS.WISHLIST, updated);
  },

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

  getItemCount: () => get().items.length,
}));
