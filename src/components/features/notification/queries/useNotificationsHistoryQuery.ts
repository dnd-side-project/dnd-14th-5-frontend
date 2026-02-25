import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';

import { notificationKeys } from '../constants/queryKeys';
import { NOTIFICATION_ENDPOINTS } from '../constants/url';

const notificationsHistorySchema = z.array(
  z.object({
    id: z.number(),
    notifiedAt: z.coerce.date(),
    title: z.string(),
  }),
);

export type NotificationsHistoryResponse = z.infer<
  typeof notificationsHistorySchema
>;

const getNotificationsHistory = async () => {
  return get<NotificationsHistoryResponse>(NOTIFICATION_ENDPOINTS.history, {
    responseSchema: notificationsHistorySchema,
  });
};

export const useNotificationHistoriesQuery = () =>
  useQuery({
    queryKey: notificationKeys.history(),
    queryFn: getNotificationsHistory,
  });
