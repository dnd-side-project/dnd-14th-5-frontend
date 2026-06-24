'use client';

import BottomNavBar from '@/src/components/layout/BottomNavBar/BottomNavBar';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import ErrorState from '@/src/components/ui/ErrorState/ErrorState';

const StatisticsPageError = () => {
  return (
    <>
      <PageHeader title="시간관 변화" />
      <ErrorState
        title="시간관 변화 정보를 불러오지 못했어요."
        description="잠시 후 다시 시도해주세요."
        className="w-full max-w-none py-20"
      />
      <BottomNavBar />
    </>
  );
};

export default StatisticsPageError;
