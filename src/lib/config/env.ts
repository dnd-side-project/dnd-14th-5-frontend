export const DIRECT_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getApiBaseUrl = () => {
  const isLocal = process.env.NODE_ENV === 'development';
  return isLocal ? '/api/proxy' : DIRECT_API_BASE_URL;
};

export const API_BASE_URL = getApiBaseUrl();
