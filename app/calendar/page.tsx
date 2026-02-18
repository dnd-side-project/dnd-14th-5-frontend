import CalendarMonth from '@/src/components/features/calendar/CalendarMonth/CalendarMonth';
import StreakBanner from '@/src/components/features/calendar/StreakBanner/StreackBanner';
import SummaryCard from '@/src/components/features/calendar/SummaryCard/SummaryCard';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import BottomNavBar from '@/src/components/ui/BottomNavBar';

const CalendarPage = () => {
  return (
    <div className="space-y-5 pb-28">
      <PageHeader title="캘린더" />
      <StreakBanner />
      <CalendarMonth />
      <SummaryCard />

      {/* TODO: 바뀐 디자인 반영 확인 해야 함 */}
      <BottomNavBar />
    </div>
  );
};

export default CalendarPage;
