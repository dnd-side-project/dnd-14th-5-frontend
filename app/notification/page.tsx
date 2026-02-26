'use client';

import { useRouter } from 'next/navigation';

import NotificationList from '@/src/components/features/notification/NotificationList/NotificationList';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import Icon from '@/src/components/ui/Icon/Icon';
import { goBackOrHome } from '@/src/lib/helpers/navigation';

const NotificationPage = () => {
  const router = useRouter();

  return (
    <section className="-mx-7.5 scrollbar-transparent-track flex h-full min-h-0 flex-col overflow-y-auto px-7.5">
      <div className="sticky top-0 z-10 bg-g-700">
        <PageHeader
          title="알림"
          leftIcon={<Icon name="chevronLeft" size={25} />}
          onLeftClick={() => goBackOrHome(router)}
        />
      </div>
      <NotificationList />
      <div className="h-10 shrink-0" />
    </section>
  );
};

export default NotificationPage;
