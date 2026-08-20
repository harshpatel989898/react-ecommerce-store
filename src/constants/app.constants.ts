export const APP_CONSTANTS = {
  FREE_SHIPPING_THRESHOLD: 4999,
  STANDARD_SHIPPING_FEE: 199,
  TAX_RATE: 0.18, // 18% GST in India
  DEFAULT_PAGE_SIZE: 12,
  COUPONS: [
    { code: 'AURA20', discountPercentage: 20, description: '20% OFF Everything for demo!' },
    { code: 'FLASH30', discountPercentage: 30, description: '30% Flash Sale Special!' },
    { code: 'WELCOME10', discountPercentage: 10, description: '10% Welcome Gift' }
  ],
  STORAGE_KEYS: {
    CART: 'aura_cart',
    WISHLIST: 'aura_wishlist',
    THEME: 'aura_theme',
    USER: 'aura_user',
    AUTH_TOKEN: 'aura_token',
  },
  ERROR_MESSAGES: {
    GENERIC: 'Something went wrong. Please try again later.',
    NETWORK: 'Network error. Please check your internet connection.',
    TIMEOUT: 'Request timed out. Please try again.',
    UNAUTHORIZED: 'You need to be logged in to perform this action.',
  },
} as const;
