import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { post } from '@/src/lib/api';

import { notificationKeys } from '../constants/queryKeys';
import { NOTIFICATION_ENDPOINTS } from '../constants/url';

const notificationTestSendRequestSchema = z.undefined();
const notificationTestSendResponseSchema = z.undefined();

type NotificationTestSendRequest = z.infer<
  typeof notificationTestSendRequestSchema
>;
type NotificationTestSendResponse = z.infer<
  typeof notificationTestSendResponseSchema
>;

const sendNotificationTest = async () => {
  return post<NotificationTestSendRequest, NotificationTestSendResponse>(
    NOTIFICATION_ENDPOINTS.testSend,
    undefined,
    {
      dataSchema: notificationTestSendRequestSchema,
      responseSchema: notificationTestSendResponseSchema,
    },
  );
};

interface UseNotificationTestSendMutationOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useNotificationTestSendMutation = (
  options?: UseNotificationTestSendMutationOptions,
) =>
  useMutation({
    mutationKey: notificationKeys.testSend(),
    mutationFn: sendNotificationTest,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
