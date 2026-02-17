import StreakBanner from '@/src/components/features/calendar/StreakBanner/StreackBanner';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import BottomNavBar from '@/src/components/ui/BottomNavBar';

const CalendarPage = () => {
  return (
    <>
      <PageHeader title="캘린더" />
      <StreakBanner />

      {/* TODO: 바뀐 디자인 반영 확인 해야 함 */}
      <BottomNavBar />
    </>
  );
};

export default CalendarPage;
