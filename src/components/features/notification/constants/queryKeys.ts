export const notificationKeys = {
  all: ['notifications'] as const,
  history: () => [...notificationKeys.all, 'history'] as const,
  readHistory: () => [...notificationKeys.all, 'history', 'read'] as const,
  testSend: () => [...notificationKeys.all, 'test-send'] as const,
};
