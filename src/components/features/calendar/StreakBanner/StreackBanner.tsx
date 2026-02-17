import Card from '@/src/components/ui/Card/Card';
import Icon from '@/src/components/ui/Icon/Icon';

const StreakBanner = () => {
  // TODO: API에서 연속 기록 일수 받아오기
  const currentStreak = 5;
  return (
    <Card className="flex items-center justify-start gap-3 bg-linear-to-r from-y-50 to-primary text-g-900 py-2">
      <Icon name="fire" size={28} />
      <div className="flex items-center gap-1">
        <span className="text-heading-h2">{currentStreak}</span>
        <span className="text-body-m text-g-300">일 연속 기록 중이에요!</span>
      </div>
    </Card>
  );
};

export default StreakBanner;
