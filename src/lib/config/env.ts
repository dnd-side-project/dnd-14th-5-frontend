const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof window === 'undefined') {
      return 'http://localhost:3000/api/proxy';
    }

    return '/api/proxy';
  }

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseURL) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'NEXT_PUBLIC_API_BASE_URL is not set in environment variables.',
      );
    }

    console.warn(
      'NEXT_PUBLIC_API_BASE_URL is not set; requests will target the current host.',
    );
  }

  return baseURL;
};

export const API_BASE_URL = getApiBaseUrl();
