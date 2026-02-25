export const userKeys = {
  all: ['users'] as const,
  detail: () => [...userKeys.all, 'detail'] as const,
  reissue: () => [...userKeys.all, 'reissue'] as const,
};
