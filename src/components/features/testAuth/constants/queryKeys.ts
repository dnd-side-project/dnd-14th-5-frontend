export const testAuthKeys = {
  all: ['testAuth'] as const,
  login: () => [...testAuthKeys.all, 'login'] as const,
  reissue: () => [...testAuthKeys.all, 'reissue'] as const,
};
