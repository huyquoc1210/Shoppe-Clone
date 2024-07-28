const config = {
  BASE_URL: import.meta.env.VITE_APP_BASE_URL,
  VERSION: import.meta.env.VITE_APP_VERSION,
  TITLE: import.meta.env.VITE_APP_TITLE,
  __PROD__: import.meta.env.NODE_ENV === 'production',
  __DEV__: import.meta.env.NODE_ENV === 'development'
};

export default config;
