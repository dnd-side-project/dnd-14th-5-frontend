export const profileKeys = {
  all: ['profile'] as const,
  logout: () => [...profileKeys.all, 'logout'] as const,
  withdraw: () => [...profileKeys.all, 'withdraw'] as const,
};
