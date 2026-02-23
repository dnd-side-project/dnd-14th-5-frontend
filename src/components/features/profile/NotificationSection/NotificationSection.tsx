'use client';

import Card from '@/src/components/ui/Card/Card';

import { MenuRow } from '../MenuRow/MenuRow';

const NotificationSection = () => {
  return (
    <Card className="flex flex-col gap-4 bg-g-400 ">
      <p className="text-body-s font-bold">알림</p>
      <MenuRow label="알림 수신" rightElement={<input type="checkbox" />} />
      <MenuRow label="알림 시간 변경" rightText="09:00 PM" />
    </Card>
  );
};

export default NotificationSection;
