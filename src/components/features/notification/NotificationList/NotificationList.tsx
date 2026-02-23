'use client';

import NotificationEmptyState from '../NotificationEmptyState/NotificationEmptyState';
import { useNotificationHistoriesQuery } from '../queries/useNotificationsHistoryQuery';

const NotificationList = () => {
  const { data } = useNotificationHistoriesQuery();

  if (data?.length === 0) {
    return (
      <div className="flex flex-col h-full items-center justify-center pb-30">
        <NotificationEmptyState />
      </div>
    );
  }

  return <>{data}</>;
};

export default NotificationList;
