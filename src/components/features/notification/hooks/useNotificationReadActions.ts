'use client';

import { useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/src/hooks/useToast';

import { notificationKeys } from '../constants/queryKeys';
import {
  type NotificationsHistoryResponse,
  useNotificationHistoriesQuery,
} from '../queries/useNotificationsHistoryQuery';
import { useReadNotificationHistoryMutation } from '../queries/useReadNotificationHistoryMutation';

export const useNotificationReadActions = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { data } = useNotificationHistoriesQuery();
  const { mutateAsync: readNotificationHistory } =
    useReadNotificationHistoryMutation();

  const refetchNotifications = () => {
    queryClient.invalidateQueries({
      queryKey: notificationKeys.history(),
    });
  };

  const removeOneFromCache = (historyId: number) => {
    queryClient.setQueryData<NotificationsHistoryResponse>(
      notificationKeys.history(),
      (prev) =>
        prev?.filter((notification) => notification.id !== historyId) ?? [],
    );
  };

  const clearAllFromCache = () => {
    queryClient.setQueryData<NotificationsHistoryResponse>(
      notificationKeys.history(),
      [],
    );
  };

  const readOne = async (historyId: number) => {
    removeOneFromCache(historyId);

    try {
      await readNotificationHistory({ historyId });
    } catch {
      showToast({
        message: '알림 삭제에 실패했어요. 잠시 후 다시 시도해주세요.',
      });
      refetchNotifications();
    }
  };

  const readAll = async () => {
    if (!data?.length) return;

    const ids = data.map((notification) => notification.id);
    clearAllFromCache();

    try {
      await Promise.all(
        ids.map((historyId) => readNotificationHistory({ historyId })),
      );
    } catch {
      showToast({
        message: '모든 알림 읽음 처리에 실패했어요. 잠시 후 다시 시도해주세요.',
      });
      refetchNotifications();
    }
  };

  return {
    notifications: data ?? [],
    hasNotifications: Boolean(data?.length),
    readOne,
    readAll,
  };
};
