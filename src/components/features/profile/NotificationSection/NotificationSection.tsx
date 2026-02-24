'use client';

import { useState } from 'react';

import Card from '@/src/components/ui/Card/Card';
import ToggleSwitch from '@/src/components/ui/ToggleSwitch/ToggleSwitch';

import { useNotificationTimeModal } from '../hooks/useNotificationTimeModal';
import { MenuRow } from '../MenuRow/MenuRow';
import NotificationTimeModal from '../NotificationTimeModal/NotificationTimeModal';
import { useNotificationScheduleQuery } from '../queries/useNotificationScheduleQuery';
import { formatScheduleTime } from '../utils/notificationTime';

const NotificationSection = () => {
  const [isOn, setIsOn] = useState(false);
  const { data: notificationSchedule } = useNotificationScheduleQuery();
  const {
    isTimeModalOpen,
    selectedTime,
    isUpdateSchedulePending,
    setSelectedTime,
    handleOpenTimeModal,
    handleCloseTimeModal,
    handleUpdateNotificationTime,
  } = useNotificationTimeModal(notificationSchedule);

  return (
    <>
      <Card className="flex flex-col gap-4 bg-g-400 ">
        <p className="text-body-s font-bold">알림</p>
        <MenuRow
          label="알림 수신"
          rightElement={
            <ToggleSwitch
              checked={isOn}
              onCheckedChange={setIsOn}
              ariaLabel="알림 수신 토글"
            />
          }
        />
        <MenuRow
          label="알림 시간 변경"
          rightText={formatScheduleTime(notificationSchedule?.notificationTime)}
          onClick={handleOpenTimeModal}
          disabled={isUpdateSchedulePending}
        />
      </Card>

      <NotificationTimeModal
        isOpen={isTimeModalOpen}
        value={selectedTime}
        onChange={setSelectedTime}
        onClose={handleCloseTimeModal}
        onSubmit={handleUpdateNotificationTime}
        isPending={isUpdateSchedulePending}
      />
    </>
  );
};

export default NotificationSection;
