export const userKeys = {
  all: ['users'] as const,
  detail: () => [...userKeys.all, 'detail'] as const,
  updateName: () => [...userKeys.all, 'update-name'] as const,
};
