import CalendarPageClient from '@/src/components/features/calendar/CalendarPageClient/CalendarPageClient';

// TODO: (protected) route group layout으로 인증 처리 통합 예정
export const dynamic = 'force-dynamic';

const CalendarPage = () => {
  return <CalendarPageClient />;
};

export default CalendarPage;
