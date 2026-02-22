'use client';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

import CalendarMonth from '@/src/components/features/calendar/CalendarMonth/CalendarMonth';
import { CALENDAR_DATE_FORMAT } from '@/src/components/features/calendar/constants/calendar';
import { useCalendarState } from '@/src/components/features/calendar/hooks/useCalendarState';
import StreakBanner from '@/src/components/features/calendar/StreakBanner/StreakBanner';
import SummaryCard from '@/src/components/features/calendar/SummaryCard/SummaryCard';
import { useMonthReflectionQuery } from '@/src/components/features/reflection/queries/useMonthReflectionQuery';
import { useTodayReflectionQuery } from '@/src/components/features/reflection/queries/useTodayReflectionQuery';
import { useUserDetailQuery } from '@/src/components/features/users/queries/useUserDetailQuery';
import BottomNavBar from '@/src/components/layout/BottomNavBar/BottomNavBar';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import ErrorState from '@/src/components/ui/ErrorState/ErrorState';

const CalendarPage = () => {
  const router = useRouter();

  const calendarState = useCalendarState();
  const formattedMonth = format(
    calendarState.currentMonth,
    CALENDAR_DATE_FORMAT.monthRequest,
  );

  const monthQuery = useMonthReflectionQuery({ month: formattedMonth });
  const todayQuery = useTodayReflectionQuery();
  const userQuery = useUserDetailQuery();

  const isAnyError =
    monthQuery.isError || todayQuery.isError || userQuery.isError;

  return (
    <div className="space-y-5 pb-28">
      <PageHeader title="캘린더" />

      {isAnyError ? (
        <ErrorState
          title="캘린더 정보를 불러오지 못했어요."
          description="잠시 후 다시 시도해주세요."
          className="w-full max-w-none py-20"
          retryLabel="홈으로 돌아가기"
          onRetry={() => router.push('/')}
        />
      ) : (
        <>
          <StreakBanner data={userQuery.data} isPending={userQuery.isPending} />
          <CalendarMonth
            {...calendarState}
            data={monthQuery.data}
            isPending={monthQuery.isPending}
          />
          <SummaryCard
            data={todayQuery.data}
            isPending={todayQuery.isPending}
          />
          {/* TODO: 바뀐 디자인 반영 확인 해야 함 */}
          <BottomNavBar />
        </>
      )}
    </div>
  );
};

export default CalendarPage;
