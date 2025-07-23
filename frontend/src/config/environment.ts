export const environment = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  environment: import.meta.env.VITE_ENVIRONMENT || 'development',
  isProduction: import.meta.env.VITE_ENVIRONMENT === 'production',
  isDevelopment: import.meta.env.VITE_ENVIRONMENT === 'development' || !import.meta.env.VITE_ENVIRONMENT,
};
