'use client';

import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

import { useNotificationReadActions } from '../hooks/useNotificationReadActions';
import NotificationEmptyState from '../NotificationEmptyState/NotificationEmptyState';
import NotificationItem from '../NotificationItem/NotificationItem';
import NotificationReadAllButton from '../NotificationReadAllButton/NotificationReadAllButton';

const NotificationListSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-24 w-full" ariaLabel="알림 목록 로딩 중" />
      <Skeleton className="h-24 w-full" ariaLabel="알림 목록 로딩 중" />
      <Skeleton className="h-24 w-full" ariaLabel="알림 목록 로딩 중" />
      <Skeleton className="h-24 w-full" ariaLabel="알림 목록 로딩 중" />
    </div>
  );
};

const NotificationList = () => {
  const {
    notifications,
    hasNotifications,
    isLoading,
    isMutating,
    readAll,
    readOne,
  } = useNotificationReadActions();

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      {!isLoading && hasNotifications && (
        <div className="flex justify-end pb-2">
          <NotificationReadAllButton disabled={isMutating} onClick={readAll} />
        </div>
      )}

      {isLoading && <NotificationListSkeleton />}

      {!isLoading && !hasNotifications && (
        <div className="flex flex-1 flex-col items-center justify-center pb-30">
          <NotificationEmptyState />
        </div>
      )}

      {!isLoading &&
        hasNotifications &&
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            id={notification.id}
            notifiedAt={notification.notifiedAt}
            title={notification.title}
            onDelete={readOne}
          />
        ))}
    </div>
  );
};

export default NotificationList;
