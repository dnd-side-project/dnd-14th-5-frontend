import { useMutation, useQueryClient } from '@tanstack/react-query';

import { del } from '@/src/lib/api';

import { profileKeys } from '../constants/queryKeys';
import { PROFILE_ENDPOINTS } from '../constants/url';
import type { NotificationScheduleResponse } from './useNotificationScheduleQuery';

interface DeleteNotificationScheduleParams {
  scheduleId: number;
}

const deleteNotificationSchedule = async ({
  scheduleId,
}: DeleteNotificationScheduleParams) => {
  return del<never, unknown>(
    PROFILE_ENDPOINTS.notificationScheduleById(scheduleId),
  );
};

export const useDeleteNotificationScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: profileKeys.deleteNotificationSchedule(),
    mutationFn: deleteNotificationSchedule,
    onSuccess: () => {
      // 삭제 직후 조회 API가 404를 반환해도 즉시 OFF 상태가 보이도록 캐시를 null로 맞춤
      queryClient.setQueryData<NotificationScheduleResponse | null>(
        profileKeys.notificationSchedule(),
        null,
      );
      queryClient.invalidateQueries({
        queryKey: profileKeys.notificationSchedule(),
      });
    },
  });
};
