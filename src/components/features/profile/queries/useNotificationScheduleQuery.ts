import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';

import { profileKeys } from '../constants/queryKeys';
import { PROFILE_ENDPOINTS } from '../constants/url';

const notificationScheduleSchema = z.object({
  id: z.number(),
  notificationTime: z.string(),
});

type NotificationScheduleResponse = z.infer<typeof notificationScheduleSchema>;

const getNotificationSchedule = async () => {
  return get<NotificationScheduleResponse>(
    PROFILE_ENDPOINTS.notificationScheduleMe,
    {
      responseSchema: notificationScheduleSchema,
    },
  );
};

export const useNotificationScheduleQuery = () =>
  useQuery({
    queryKey: profileKeys.notificationSchedule(),
    queryFn: getNotificationSchedule,
  });
