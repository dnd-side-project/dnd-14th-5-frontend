import { useState } from 'react';

import type { TimeValue } from '@/src/components/ui/TimeWheelPicker/TimeWheelPicker';
import { useToast } from '@/src/hooks/useToast';

import { useUpdateNotificationScheduleMutation } from '../queries/useUpdateNotificationScheduleMutation';
import { toScheduleTime, toTimeValue } from '../utils/notificationTime';

interface NotificationSchedule {
  id: number;
  notificationTime: string;
}

interface UseNotificationTimeModalResult {
  isTimeModalOpen: boolean;
  selectedTime: TimeValue;
  isSubmitPending: boolean;
  setSelectedTime: (next: TimeValue) => void;
  handleOpenTimeModal: () => void;
  handleCloseTimeModal: () => void;
  handleUpdateNotificationTime: () => Promise<void>;
}

export const useNotificationTimeModal = (
  notificationSchedule: NotificationSchedule | null | undefined,
): UseNotificationTimeModalResult => {
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<TimeValue>({
    hour: '09',
    minute: '00',
  });
  const { showToast } = useToast();
  const {
    mutateAsync: updateNotificationSchedule,
    isPending: isSubmitPending,
  } = useUpdateNotificationScheduleMutation();

  const handleOpenTimeModal = () => {
    if (!notificationSchedule?.id) {
      showToast({ message: '먼저 알림을 켜주세요.' });
      return;
    }

    setSelectedTime(toTimeValue(notificationSchedule.notificationTime));
    setIsTimeModalOpen(true);
  };

  const handleCloseTimeModal = () => {
    if (isSubmitPending) {
      return;
    }

    setIsTimeModalOpen(false);
  };

  const handleUpdateNotificationTime = async () => {
    if (isSubmitPending || !notificationSchedule?.id) {
      if (!notificationSchedule?.id) {
        showToast({ message: '먼저 알림을 켜주세요.' });
      }
      return;
    }

    try {
      await updateNotificationSchedule({
        scheduleId: notificationSchedule.id,
        notificationTime: toScheduleTime(selectedTime),
      });
      setIsTimeModalOpen(false);
      showToast({ message: '알림 시간이 변경되었어요.' });
    } catch {
      showToast({ message: '알림 시간 저장에 실패했어요.' });
    }
  };

  return {
    isTimeModalOpen,
    selectedTime,
    isSubmitPending,
    setSelectedTime,
    handleOpenTimeModal,
    handleCloseTimeModal,
    handleUpdateNotificationTime,
  };
};
