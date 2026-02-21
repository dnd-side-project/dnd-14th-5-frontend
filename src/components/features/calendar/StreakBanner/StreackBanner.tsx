'use client';

import Card from '@/src/components/ui/Card/Card';
import Icon from '@/src/components/ui/Icon/Icon';
import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

import type { UserDetailResponse } from '../../users/queries/useUserDetailQuery';

interface StreakBannerProps {
  data?: UserDetailResponse;
  isPending: boolean;
}

const StreakBanner = ({ data, isPending }: StreakBannerProps) => {
  if (isPending) {
    return (
      <Card className="bg-linear-to-r from-y-50 to-primary py-2">
        <Skeleton
          className="h-8 w-full bg-g-300/30"
          ariaLabel="연속 기록 로딩 중"
        />
      </Card>
    );
  }

  const currentStreak = data?.streakDays ?? 0;

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
