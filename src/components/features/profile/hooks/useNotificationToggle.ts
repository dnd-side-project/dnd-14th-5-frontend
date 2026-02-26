import { useToast } from '@/src/hooks/useToast';
import { getFcmToken } from '@/src/lib/firebase/messaging';

import { useCreateNotificationScheduleMutation } from '../queries/useCreateNotificationScheduleMutation';
import { useDeleteNotificationScheduleMutation } from '../queries/useDeleteNotificationScheduleMutation';
import type { NotificationScheduleResponse } from '../queries/useNotificationScheduleQuery';

interface UseNotificationToggleResult {
  isOn: boolean;
  isTogglePending: boolean;
  handleNotificationToggle: (next: boolean) => Promise<void>;
}

export const useNotificationToggle = (
  notificationSchedule: NotificationScheduleResponse | null | undefined,
): UseNotificationToggleResult => {
  const { showToast } = useToast();
  const {
    mutateAsync: createNotificationSchedule,
    isPending: isCreateSchedulePending,
  } = useCreateNotificationScheduleMutation();
  const {
    mutateAsync: deleteNotificationSchedule,
    isPending: isDeleteSchedulePending,
  } = useDeleteNotificationScheduleMutation();

  const isTogglePending = isCreateSchedulePending || isDeleteSchedulePending;
  const isOn = Boolean(notificationSchedule?.id);

  const enableNotification = async () => {
    if (notificationSchedule?.id) {
      return;
    }

    try {
      const token = await getFcmToken();

      if (!token) {
        showToast({
          message: '알림 권한이 없거나 지원되지 않는 브라우저예요.',
        });
        return;
      }

      await createNotificationSchedule({
        notificationTime: '21:00:00',
        token,
      });
      showToast({ message: '알림이 설정되었어요.' });
    } catch {
      showToast({ message: '알림 설정에 실패했어요.' });
    }
  };

  const disableNotification = async () => {
    if (!notificationSchedule?.id) {
      return;
    }

    try {
      await deleteNotificationSchedule({
        scheduleId: notificationSchedule.id,
      });
      showToast({ message: '알림이 해제되었어요.' });
    } catch {
      showToast({ message: '알림 해제에 실패했어요.' });
    }
  };

  const handleNotificationToggle = async (next: boolean) => {
    if (isTogglePending) {
      return;
    }

    if (next) {
      await enableNotification();
      return;
    }

    await disableNotification();
  };

  return {
    isOn,
    isTogglePending,
    handleNotificationToggle,
  };
};
