'use client';

import { useRouter } from 'next/navigation';

import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import Icon from '@/src/components/ui/Icon/Icon';

const ProfileNicknamePage = () => {
  const router = useRouter();

  return (
    <>
      <PageHeader
        title="닉네임 변경"
        leftIcon={<Icon name="chevronLeft" size={28} alt="back" />}
        onLeftClick={() => router.back()}
        className="fixed top-0 left-1/2 z-50 w-full max-w-110 -translate-x-1/2 bg-g-700 px-7.5"
      />
      <div className="pt-14 px-7.5">
        <p className="text-body-s text-g-20">닉네임 수정 화면 준비 중</p>
      </div>
    </>
  );
};

export default ProfileNicknamePage;
