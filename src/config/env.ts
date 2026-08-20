export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.aurastore.io/v1',
  APP_NAME: 'AuraStore Luxury Tech',
  IS_DEV: import.meta.env.DEV,
  TIMEOUT: 15000,
  TOKEN_KEY: 'aura_access_token',
  REFRESH_TOKEN_KEY: 'aura_refresh_token',
};
