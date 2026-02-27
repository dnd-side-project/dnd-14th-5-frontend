export const DIRECT_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getApiBaseUrl = () => {
  if (typeof window === 'undefined') {
    if (!DIRECT_API_BASE_URL) {
      throw new Error('API base URL not set');
    }
    return DIRECT_API_BASE_URL;
  }

  if (process.env.NODE_ENV === 'development') {
    return '/api/proxy';
  }

  return DIRECT_API_BASE_URL;
};

export const API_BASE_URL = getApiBaseUrl();
