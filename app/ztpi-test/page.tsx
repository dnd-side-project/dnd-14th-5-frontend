'use client';

import { useRouter } from 'next/navigation';

import ZtpiTest from '@/src/components/features/test/ZtpiTest/ZtpiTest';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import Icon from '@/src/components/ui/Icon/Icon';

const ZtpiTestPage = () => {
  const router = useRouter();

  return (
    <main>
      <PageHeader
        title="ZTPI 테스트"
        onLeftClick={() => router.back()}
        leftIcon={<Icon name="chevronLeft" size={25} />}
      />
      <ZtpiTest />
    </main>
  );
};

export default ZtpiTestPage;
