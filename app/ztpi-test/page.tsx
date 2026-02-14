'use client';

import { useRouter } from 'next/navigation';

import ZtpiTest from '@/src/components/features/test/ZtpiTest/ZtpiTest';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import Icon from '@/src/components/ui/Icon/Icon';
import { goBackOrHome } from '@/src/lib/helpers/navigation';

const ZtpiTestPage = () => {
  const router = useRouter();

  return (
    <div>
      <PageHeader
        title="ZTPI 테스트"
        onLeftClick={() => goBackOrHome(router)}
        leftIcon={<Icon name="chevronLeft" size={25} />}
      />
      <ZtpiTest />
    </div>
  );
};

export default ZtpiTestPage;
