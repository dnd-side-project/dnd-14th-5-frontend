'use client';

import { useRouter } from 'next/navigation';

import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import Icon from '@/src/components/ui/Icon/Icon';
import { goBackOrHome } from '@/src/lib/helpers/navigation';

const CharactersHeader = () => {
  const router = useRouter();

  return (
    <PageHeader
      title="다른 캐릭터 알아보기"
      leftIcon={<Icon name="chevronLeft" size={28} alt="back" />}
      onLeftClick={() => goBackOrHome(router)}
    />
  );
};

export default CharactersHeader;
