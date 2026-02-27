import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { patch } from '@/src/lib/api';

import { profileKeys } from '../constants/queryKeys';
import { PROFILE_ENDPOINTS } from '../constants/url';

const updateNotificationScheduleRequestSchema = z.object({
  notificationTime: z.string(),
});

interface UpdateNotificationScheduleParams {
  scheduleId: number;
  notificationTime: string;
}

type UpdateNotificationScheduleRequest = z.infer<
  typeof updateNotificationScheduleRequestSchema
>;

const updateNotificationSchedule = async ({
  scheduleId,
  notificationTime,
}: UpdateNotificationScheduleParams) => {
  return patch<UpdateNotificationScheduleRequest, unknown>(
    PROFILE_ENDPOINTS.notificationScheduleById(scheduleId),
    updateNotificationScheduleRequestSchema.parse({ notificationTime }),
  );
};

export const useUpdateNotificationScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: profileKeys.updateNotificationSchedule(),
    mutationFn: updateNotificationSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: profileKeys.notificationSchedule(),
      });
    },
  });
};
