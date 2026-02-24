export const PROFILE_ENDPOINTS = {
  logout: '/auth/logout',
  withdraw: '/users/me',
  notificationSchedule: '/notifications/schedules',
  notificationScheduleMe: '/notifications/schedules/me',
  notificationScheduleById: (scheduleId: number) =>
    `/notifications/schedules/${scheduleId}`,
} as const;
