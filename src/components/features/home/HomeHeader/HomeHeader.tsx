'use client';

import { useRouter } from 'next/navigation';

import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import Icon from '@/src/components/ui/Icon/Icon';

const HomeHeader = () => {
  const router = useRouter();

  const handleNotificationClick = () => {
    router.push('/notification');
  };

  return (
    // TODO: 알림 있을 때 오른쪽 아이콘 active 상태로 바꿔야 함
    <PageHeader
      title=""
      leftIcon={<Icon name="timoTitle" size={72} />}
      leftSlotVariant="logo"
      rightIcon={<Icon name="bellInactive" size={28} />}
      onRightClick={handleNotificationClick}
    />
  );
};

export default HomeHeader;
