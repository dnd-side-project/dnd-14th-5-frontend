'use client';

import Card from '@/src/components/ui/Card/Card';

import { MenuRow } from '../MenuRow/MenuRow';

const AccountSection = () => {
  return (
    <Card className="flex flex-col gap-4 bg-g-400 ">
      <p className="text-body-s font-bold">시간관 캐릭터 테스트</p>
      <MenuRow label="테스트 다시하기" onClick={() => {}} />
      <MenuRow label="지난 테스트결과 보기" onClick={() => {}} />
    </Card>
  );
};

export default AccountSection;
