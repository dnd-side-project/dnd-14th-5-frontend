'use client';

import Card from '@/src/components/ui/Card/Card';

import { MenuRow } from '../MenuRow/MenuRow';

const AccountSection = () => {
  return (
    <Card className="flex flex-col gap-4 bg-g-400 ">
      <MenuRow label="로그아웃" onClick={() => {}} />
      <MenuRow label="탈퇴하기" onClick={() => {}} />
    </Card>
  );
};

export default AccountSection;
