const getApiBaseUrl = () => {
  if (typeof window === 'undefined') {
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:3000/api/proxy';
    }

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseURL) {
      throw new Error(
        'NEXT_PUBLIC_API_BASE_URL is not set in environment variables.',
      );
    }

    return baseURL;
  }

  return '/api/proxy';
};

export const API_BASE_URL = getApiBaseUrl();
