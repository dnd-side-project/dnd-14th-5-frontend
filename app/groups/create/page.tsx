import Link from 'next/link';

import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import Icon from '@/src/components/ui/Icon/Icon';

export default function Page() {
  return (
    <>
      <PageHeader
        title="그룹 생성하기"
        leftIcon={
          <Link href="/groups">
            <Icon name="chevronLeft" size={28} alt="뒤로가기" />
          </Link>
        }
        className="fixed top-0 left-1/2 z-50 w-full max-w-110 -translate-x-1/2 bg-g-700 px-7.5"
      />
    </>
  );
}
