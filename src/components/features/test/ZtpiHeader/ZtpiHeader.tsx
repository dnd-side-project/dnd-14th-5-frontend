'use client';

import { useRouter } from 'next/navigation';

import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import Icon from '@/src/components/ui/Icon/Icon';
import { goBackOrHome } from '@/src/lib/helpers/navigation';

const ZtpiHeader = () => {
  const router = useRouter();

  return (
    <PageHeader
      title="ZTPI 테스트"
      onLeftClick={() => goBackOrHome(router)}
      leftIcon={<Icon name="chevronLeft" size={25} />}
    />
  );
};

export default ZtpiHeader;
