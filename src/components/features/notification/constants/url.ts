export const NOTIFICATION_ENDPOINTS = {
  history: '/notifications/histories/me',
  historyById: (historyId: number) => `/notifications/histories/${historyId}`,
  testSend: '/notifications/schedules/test-send',
} as const;
