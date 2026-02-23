'use client';

import { useState } from 'react';

import Card from '@/src/components/ui/Card/Card';
import ToggleSwitch from '@/src/components/ui/ToggleSwitch/ToggleSwitch';

import { MenuRow } from '../MenuRow/MenuRow';

const NotificationSection = () => {
  const [isOn, setIsOn] = useState(false);

  return (
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
      <MenuRow label="알림 시간 변경" rightText="09:00 PM" />
    </Card>
  );
};

export default NotificationSection;
