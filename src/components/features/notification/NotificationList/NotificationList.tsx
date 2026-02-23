'use client';

import { useNotificationReadActions } from '../hooks/useNotificationReadActions';
import NotificationEmptyState from '../NotificationEmptyState/NotificationEmptyState';
import NotificationItem from '../NotificationItem/NotificationItem';
import NotificationReadAllButton from '../NotificationReadAllButton/NotificationReadAllButton';

const NotificationList = () => {
  const { notifications, hasNotifications, readAll, readOne } =
    useNotificationReadActions();

  if (!hasNotifications) {
    return (
      <div className="flex h-full flex-col items-center justify-center pb-30">
        <NotificationEmptyState />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end pb-2">
        <NotificationReadAllButton
          disabled={!hasNotifications}
          onClick={readAll}
        />
      </div>
      {notifications.map((notification) => (
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
