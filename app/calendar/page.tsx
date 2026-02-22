'use client';

import dynamic from 'next/dynamic';

const CalendarPageClient = dynamic(
  () =>
    import('@/src/components/features/calendar/CalendarPageClient/CalendarPageClient'),
  {
    ssr: false,
  },
);

const CalendarPage = () => {
  return (
    <>
      {/* TODO: middleware 기반 인증/재발급 처리로 전환 후 ssr: false 제거 검토 */}
      <CalendarPageClient />
    </>
  );
};

export default CalendarPage;
