import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';
import type { ApiError } from '@/src/lib/api/error';

import { profileKeys } from '../constants/queryKeys';
import { PROFILE_ENDPOINTS } from '../constants/url';

const notificationScheduleSchema = z.object({
  id: z.number(),
  notificationTime: z.string(),
});

export type NotificationScheduleResponse = z.infer<
  typeof notificationScheduleSchema
>;

const isApiErrorWithStatus = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof error.status === 'number'
  );
};

const getNotificationSchedule = async () => {
  try {
    return await get<NotificationScheduleResponse>(
      PROFILE_ENDPOINTS.notificationScheduleMe,
      {
        responseSchema: notificationScheduleSchema,
      },
    );
  } catch (error) {
    // 404는 예외가 아니라 "등록된 알림 스케줄 없음" 상태로 처리
    if (isApiErrorWithStatus(error) && error.status === 404) {
      return null;
    }

    throw error;
  }
};

export const useNotificationScheduleQuery = () =>
  useQuery({
    queryKey: profileKeys.notificationSchedule(),
    queryFn: getNotificationSchedule,
  });
