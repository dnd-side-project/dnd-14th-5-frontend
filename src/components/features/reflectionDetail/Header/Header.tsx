'use client';

import { useRouter } from 'next/navigation';

import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import Icon from '@/src/components/ui/Icon/Icon';
import { goBackOrHome } from '@/src/lib/helpers/navigation';

const Header = () => {
  const router = useRouter();

  return (
    <PageHeader
      title="나의 기록"
      leftIcon={<Icon name="chevronLeft" size={25} />}
      onLeftClick={() => goBackOrHome(router)}
    />
  );
};

export default Header;
