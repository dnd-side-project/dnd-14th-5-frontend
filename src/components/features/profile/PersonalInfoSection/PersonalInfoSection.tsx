'use client';

import { useRouter } from 'next/navigation';

import Card from '@/src/components/ui/Card/Card';

import { MenuRow } from '../MenuRow/MenuRow';

const PersonalInfoSection = () => {
  const router = useRouter();

  return (
    <Card className="flex flex-col gap-4 bg-g-400 ">
      <p className="text-body-s font-bold">개인정보</p>
      <MenuRow
        label="닉네임 변경"
        onClick={() => router.push('/profile/nickname')}
      />
      <MenuRow label="계정관리" rightText="oauth 로그인" />
    </Card>
  );
};

export default PersonalInfoSection;
