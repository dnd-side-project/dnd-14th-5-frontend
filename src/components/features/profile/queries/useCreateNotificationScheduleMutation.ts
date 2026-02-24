import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { post } from '@/src/lib/api';

import { profileKeys } from '../constants/queryKeys';
import { PROFILE_ENDPOINTS } from '../constants/url';

const createNotificationScheduleRequestSchema = z.object({
  notificationTime: z.string(),
  token: z.string(),
});

type CreateNotificationScheduleRequest = z.infer<
  typeof createNotificationScheduleRequestSchema
>;

const createNotificationSchedule = async (
  request: CreateNotificationScheduleRequest,
) => {
  return post<CreateNotificationScheduleRequest, unknown>(
    PROFILE_ENDPOINTS.notificationSchedule,
    request,
    {
      dataSchema: createNotificationScheduleRequestSchema,
    },
  );
};

export const useCreateNotificationScheduleMutation = () =>
  useMutation({
    mutationKey: profileKeys.createNotificationSchedule(),
    mutationFn: createNotificationSchedule,
  });
