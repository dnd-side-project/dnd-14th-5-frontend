'use client';

import Icon from '@/src/components/ui/Icon/Icon';

interface CalendarMonthHeaderProps {
  currentMonthLabel: string;
  goPrevMonth: () => void;
  goNextMonth: () => void;
}

const CalendarMonthHeader = ({
  currentMonthLabel,
  goPrevMonth,
  goNextMonth,
}: CalendarMonthHeaderProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={goPrevMonth}
        aria-label="이전 달"
        className="flex h-8 w-8 items-center justify-center rounded-full text-g-80 hover:bg-g-500"
      >
        <Icon name="chevronLeft" decorative size={24} />
      </button>
      <p className="text-center text-heading-h3">{currentMonthLabel}</p>
      <button
        type="button"
        onClick={goNextMonth}
        aria-label="다음 달"
        className="flex h-8 w-8 items-center justify-center rounded-full text-g-80 hover:bg-g-500"
      >
        <Icon name="chevronLeft" decorative className="rotate-180" size={24} />
      </button>
    </div>
  );
};

export default CalendarMonthHeader;
