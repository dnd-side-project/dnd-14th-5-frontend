export const NOTIFICATION_ENDPOINTS = {
  history: '/notifications/histories/me',
  historyById: (historyId: number) => `/notifications/histories/${historyId}`,
} as const;
