import { useToast } from '@/src/hooks/useToast';
import {
  type FcmTokenFailureReason,
  getFcmToken,
} from '@/src/lib/firebase/messaging';

import { useCreateNotificationScheduleMutation } from '../queries/useCreateNotificationScheduleMutation';
import { useDeleteNotificationScheduleMutation } from '../queries/useDeleteNotificationScheduleMutation';
import type { NotificationScheduleResponse } from '../queries/useNotificationScheduleQuery';
import {
  getDefaultNotificationScheduleTime,
  getStoredNotificationTime,
} from '../utils/notificationTime';

interface UseNotificationToggleResult {
  isOn: boolean;
  isTogglePending: boolean;
  handleNotificationToggle: (next: boolean) => Promise<void>;
}

const getNotificationUnsupportedMessage = (reason: FcmTokenFailureReason) => {
  if (reason === 'UNSUPPORTED') {
    return '아이폰은 Safari로 홈 화면에 추가한 앱에서만 알림을 지원해요.';
  }

  if (reason === 'PERMISSION_DENIED') {
    return '브라우저 알림 권한이 꺼져 있어요. 설정에서 권한을 허용해주세요.';
  }

  if (reason === 'MISSING_VAPID_KEY') {
    return '알림 설정값이 누락되어 있어요. 관리자에게 문의해주세요.';
  }

  return '알림 권한이 없거나 지원되지 않는 브라우저예요.';
};

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
      const { token, reason } = await getFcmToken();
      const notificationTime =
        getStoredNotificationTime() ?? getDefaultNotificationScheduleTime();

      if (!token) {
        const message = getNotificationUnsupportedMessage(
          reason ?? 'UNSUPPORTED',
        );
        showToast({
          message,
        });
        return;
      }

      await createNotificationSchedule({
        notificationTime,
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
