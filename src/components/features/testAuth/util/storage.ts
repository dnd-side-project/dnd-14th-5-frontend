const STORAGE_ACCESS_TOKEN_KEY = 'dev_access_token';
const STORAGE_REFRESH_TOKEN_KEY = 'dev_refresh_token';

export const getStoredRefreshToken = () =>
  typeof window === 'undefined'
    ? ''
    : (localStorage.getItem(STORAGE_REFRESH_TOKEN_KEY) ?? '');

export const persistTokens = (
  nextAccessToken: string,
  nextRefreshToken: string,
) => {
  localStorage.setItem(STORAGE_ACCESS_TOKEN_KEY, nextAccessToken);
  localStorage.setItem(STORAGE_REFRESH_TOKEN_KEY, nextRefreshToken);
};

export const clearStoredTokens = () => {
  localStorage.removeItem(STORAGE_ACCESS_TOKEN_KEY);
  localStorage.removeItem(STORAGE_REFRESH_TOKEN_KEY);
};
