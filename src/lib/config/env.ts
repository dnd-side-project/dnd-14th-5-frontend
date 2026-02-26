export const DIRECT_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof window === 'undefined') {
      return 'http://localhost:3000/api/proxy';
    }

    return '/api/proxy';
  }

  if (!DIRECT_API_BASE_URL) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'NEXT_PUBLIC_API_BASE_URL is not set in environment variables.',
      );
    }

    console.warn(
      'NEXT_PUBLIC_API_BASE_URL is not set; requests will target the current host.',
    );
  }

  return DIRECT_API_BASE_URL;
};

export const API_BASE_URL = getApiBaseUrl();
