import Card from '@/src/components/ui/Card/Card';
import Icon from '@/src/components/ui/Icon/Icon';

import { formatKoreanLocaleDateTime } from '../utils/formatKoreanLocaleDateTime';

interface NotificationItemProps {
  id: number;
  notifiedAt: Date;
  title: string;
  onDelete: (id: number) => void;
}

const NotificationItem = ({
  id,
  notifiedAt,
  title,
  onDelete,
}: NotificationItemProps) => {
  const notifiedAtText = formatKoreanLocaleDateTime(notifiedAt);

  return (
    <Card className="flex flex-col gap-2 bg-g-400">
      <div className="flex justify-between ">
        <div className="flex items-center gap-2">
          <Icon name="bellInactive" size={22} />
          <p className="text-caption-n text-g-80">{notifiedAtText}</p>
        </div>
        <button
          type="button"
          onClick={() => onDelete(id)}
          aria-label="알림 읽음 처리"
        >
          <Icon name="close" size={12} />
        </button>
      </div>
      <p className="text-body-s">{title}</p>
    </Card>
  );
};

export default NotificationItem;
