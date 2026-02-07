export const ensureDevelopment = () => {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Test auth API is only available in development.');
  }
};
