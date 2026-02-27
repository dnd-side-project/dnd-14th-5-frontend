'use client';

import { useRouter } from 'next/navigation';

import Card from '@/src/components/ui/Card/Card';

import { PROVIDER_LOGIN_TEXT } from '../../users/constants/provider';
import { useUserDetailQuery } from '../../users/queries/useUserDetailQuery';
import { MenuRow } from '../MenuRow/MenuRow';

const PersonalInfoSection = () => {
  const router = useRouter();
  const { data } = useUserDetailQuery();
  const providerLoginText = data?.provider
    ? (PROVIDER_LOGIN_TEXT[data.provider] ?? '')
    : '';

  return (
    <Card className="flex flex-col gap-4 bg-g-400 ">
      <p className="font-body-s font-bold">개인정보</p>
      <MenuRow
        label="닉네임 변경"
        onClick={() => router.push('/profile/nickname')}
      />
      <MenuRow label="계정관리" rightText={providerLoginText} />
    </Card>
  );
};

export default PersonalInfoSection;
