export const profileKeys = {
  all: ['profile'] as const,
  logout: () => [...profileKeys.all, 'logout'] as const,
  withdraw: () => [...profileKeys.all, 'withdraw'] as const,
  notificationSchedule: () =>
    [...profileKeys.all, 'notification-schedule'] as const,
  createNotificationSchedule: () =>
    [...profileKeys.all, 'create-notification-schedule'] as const,
  updateNotificationSchedule: () =>
    [...profileKeys.all, 'update-notification-schedule'] as const,
};
