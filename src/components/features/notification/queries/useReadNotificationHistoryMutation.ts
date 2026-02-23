import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patch } from '@/src/lib/api';

import { notificationKeys } from '../constants/queryKeys';
import { NOTIFICATION_ENDPOINTS } from '../constants/url';

interface ReadNotificationHistoryParams {
  historyId: number;
}

const readNotificationHistory = async ({
  historyId,
}: ReadNotificationHistoryParams) => {
  return patch<undefined, undefined>(
    NOTIFICATION_ENDPOINTS.historyById(historyId),
    undefined,
  );
};

export const useReadNotificationHistoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: notificationKeys.readHistory(),
    mutationFn: readNotificationHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.history(),
      });
    },
  });
};
