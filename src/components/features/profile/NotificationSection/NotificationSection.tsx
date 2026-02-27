'use client';

import { useSyncExternalStore } from 'react';

import Card from '@/src/components/ui/Card/Card';
import ToggleSwitch from '@/src/components/ui/ToggleSwitch/ToggleSwitch';

import { useNotificationTimeModal } from '../hooks/useNotificationTimeModal';
import { useNotificationToggle } from '../hooks/useNotificationToggle';
import { MenuRow } from '../MenuRow/MenuRow';
import NotificationTimeModal from '../NotificationTimeModal/NotificationTimeModal';
import { useNotificationScheduleQuery } from '../queries/useNotificationScheduleQuery';
import {
  formatScheduleTime,
  getStoredNotificationTime,
} from '../utils/notificationTime';

// TODO: 실제 그 시간에 알림이 잘 오는지 보고 추가 수정 해야 함
const NotificationSection = () => {
  const storedNotificationTime = useSyncExternalStore(
    () => () => undefined,
    getStoredNotificationTime,
    () => null,
  );

  const { data: notificationSchedule } = useNotificationScheduleQuery();

  const { isOn, isTogglePending, handleNotificationToggle } =
    useNotificationToggle(notificationSchedule);
  const {
    isTimeModalOpen,
    selectedTime,
    isSubmitPending,
    setSelectedTime,
    handleOpenTimeModal,
    handleCloseTimeModal,
    handleUpdateNotificationTime,
  } = useNotificationTimeModal(notificationSchedule);

  const displayNotificationTime =
    notificationSchedule?.notificationTime ??
    storedNotificationTime ??
    undefined;

  return (
    <>
      <Card className="flex flex-col gap-4 bg-g-400 ">
        <p className="font-body-s font-bold">알림</p>
        <MenuRow
          label="알림 수신"
          rightElement={
            <ToggleSwitch
              checked={isOn}
              onCheckedChange={handleNotificationToggle}
              ariaLabel="알림 수신 토글"
              disabled={isTogglePending}
            />
          }
        />
        <MenuRow
          label="알림 시간 변경"
          rightText={formatScheduleTime(displayNotificationTime)}
          onClick={handleOpenTimeModal}
          disabled={!isOn || isSubmitPending || isTogglePending}
        />
      </Card>

      <NotificationTimeModal
        isOpen={isTimeModalOpen}
        value={selectedTime}
        onChange={setSelectedTime}
        onClose={handleCloseTimeModal}
        onSubmit={handleUpdateNotificationTime}
        isPending={isSubmitPending}
      />
    </>
  );
};

export default NotificationSection;
