import { create } from 'zustand';
import { CartItem, Coupon, OrderDetails } from '../types/cart.types';
import { Product } from '../types/product.types';
import { APP_CONSTANTS } from '../constants/app.constants';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { useToastStore } from './useToastStore';

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  isCheckoutOpen: boolean;
  activeCoupon: Coupon | null;
  lastOrder: OrderDetails | null;

  // Actions
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string, color?: string, size?: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;

  openCheckout: () => void;
  closeCheckout: () => void;
  setLastOrder: (order: OrderDetails) => void;

  // Selectors / Helpers
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingFee: () => number;
  getTaxAmount: () => number;
  getTotalAmount: () => number;
  getTotalItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: getStorageItem<CartItem[]>(APP_CONSTANTS.STORAGE_KEYS.CART, []),
  isDrawerOpen: false,
  isCheckoutOpen: false,
  activeCoupon: null,
  lastOrder: null,

  addToCart: (product, quantity = 1, color, size) => {
    const current = get().items;
    const selectedColor = color || (product.colors && product.colors.length > 0 ? product.colors[0] : undefined);
    const selectedSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);

    const existingIndex = current.findIndex(
      (item) =>
        item.product.id === product.id &&
        (!selectedColor || item.selectedColor === selectedColor) &&
        (!selectedSize || item.selectedSize === selectedSize)
    );

    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = current.map((item, idx) => {
        if (idx === existingIndex) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
    } else {
      const newItem: CartItem = {
        product,
        quantity,
        selectedColor,
        selectedSize,
        addedAt: new Date().toISOString(),
      };
      updated = [...current, newItem];
    }

    set({ items: updated });
    setStorageItem(APP_CONSTANTS.STORAGE_KEYS.CART, updated);
    useToastStore.getState().success('Added to Cart! 🛒', `${quantity}x ${product.name} ready in your cart.`);
  },

  updateQuantity: (productId, quantity, color, size) => {
    if (quantity <= 0) {
      get().removeFromCart(productId, color, size);
      return;
    }

    const current = get().items;
    const updated = current.map((item) => {
      if (
        item.product.id === productId &&
        (!color || item.selectedColor === color) &&
        (!size || item.selectedSize === size)
      ) {
        return { ...item, quantity };
      }
      return item;
    });

    set({ items: updated });
    setStorageItem(APP_CONSTANTS.STORAGE_KEYS.CART, updated);
  },

  removeFromCart: (productId, color, size) => {
    const current = get().items;
    const removedItem = current.find((item) => item.product.id === productId);
    const updated = current.filter(
      (item) =>
        !(
          item.product.id === productId &&
          (!color || item.selectedColor === color) &&
          (!size || item.selectedSize === size)
        )
    );

    set({ items: updated });
    setStorageItem(APP_CONSTANTS.STORAGE_KEYS.CART, updated);

    if (removedItem) {
      useToastStore.getState().info('Item Removed', `${removedItem.product.name} removed from your cart.`);
    }
  },

  clearCart: () => {
    set({ items: [], activeCoupon: null });
    setStorageItem(APP_CONSTANTS.STORAGE_KEYS.CART, []);
  },

  applyCoupon: (code) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = APP_CONSTANTS.COUPONS.find((c) => c.code === cleanCode);
    if (coupon) {
      set({ activeCoupon: coupon });
      useToastStore
        .getState()
        .success(`Coupon ${coupon.code} Applied!`, `You unlocked a ${coupon.discountPercentage}% discount!`);
      return true;
    } else {
      useToastStore
        .getState()
        .error('Invalid Promo Code', 'Try AURA20, FLASH30 or WELCOME10 for instant discount.');
      return false;
    }
  },

  removeCoupon: () => {
    set({ activeCoupon: null });
    useToastStore.getState().info('Coupon Removed', 'Discount coupon was removed from order.');
  },

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

  openCheckout: () => {
    if (get().items.length === 0) {
      useToastStore.getState().warning('Cart is Empty', 'Add items to your cart before proceeding to checkout.');
      return;
    }
    set({ isDrawerOpen: false, isCheckoutOpen: true });
  },

  closeCheckout: () => set({ isCheckoutOpen: false }),
  setLastOrder: (order) => set({ lastOrder: order }),

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  },

  getDiscountAmount: () => {
    const subtotal = get().getSubtotal();
    const coupon = get().activeCoupon;
    if (!coupon) return 0;
    return (subtotal * coupon.discountPercentage) / 100;
  },

  getShippingFee: () => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0 || subtotal >= APP_CONSTANTS.FREE_SHIPPING_THRESHOLD) {
      return 0;
    }
    return APP_CONSTANTS.STANDARD_SHIPPING_FEE;
  },

  getTaxAmount: () => {
    const taxable = get().getSubtotal() - get().getDiscountAmount();
    return Math.max(0, taxable * APP_CONSTANTS.TAX_RATE);
  },

  getTotalAmount: () => {
    return get().getSubtotal() - get().getDiscountAmount() + get().getShippingFee() + get().getTaxAmount();
  },

  getTotalItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
