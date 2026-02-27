'use client';

import { useRouter } from 'next/navigation';

import NicknameEditSection from '@/src/components/features/profile/NicknameEditSection/NicknameEditSection';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import Icon from '@/src/components/ui/Icon/Icon';
import { goBackOrHome } from '@/src/lib/helpers/navigation';

const ProfileNicknamePage = () => {
  const router = useRouter();

  return (
    <>
      <PageHeader
        title=""
        leftIcon={<Icon name="chevronLeft" size={28} alt="back" />}
        onLeftClick={() => goBackOrHome(router)}
        className="fixed top-0 left-1/2 z-50 w-full max-w-110 -translate-x-1/2 bg-g-700 px-7.5"
      />
      <NicknameEditSection />
    </>
  );
};

export default ProfileNicknamePage;
