'use client';

import { useRouter } from 'next/navigation';

import ErrorState from '@/src/components/ui/ErrorState/ErrorState';

const CalendarPageError = () => {
  const router = useRouter();

  return (
    <ErrorState
      title="캘린더 정보를 불러오지 못했어요."
      description="잠시 후 다시 시도해주세요."
      className="w-full max-w-none py-20"
      retryLabel="홈으로 돌아가기"
      onRetry={() => router.push('/')}
    />
  );
};

export default CalendarPageError;
