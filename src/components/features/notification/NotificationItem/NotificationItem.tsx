import Card from '@/src/components/ui/Card/Card';
import Icon from '@/src/components/ui/Icon/Icon';

const NotificationItem = () => {
  return (
    // TODO: 실제 값으로 채워 넣어야 함
    <Card className="flex flex-col gap-2 bg-g-400">
      <div className="flex justify-between ">
        <div className="flex items-center gap-2">
          <Icon name="bellInactive" size={22} />
          <p className="text-caption-n text-g-80">2월 8일 20:00</p>
        </div>
        <Icon name="close" size={12} />
      </div>
      <p className="text-body-s">
        하루를 돌아볼 시간이에요. 오늘은 어떤 하루였나요?
      </p>
    </Card>
  );
};

export default NotificationItem;
