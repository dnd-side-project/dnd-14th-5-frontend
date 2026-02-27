'use client';

import { format } from 'date-fns';
import { useMemo } from 'react';

import { useSuspenseMonthReflectionQuery } from '../../reflection/queries/useMonthReflectionQuery';
import type { SelectedSummaryCardData } from '../CalendarPageClient/CalendarPageClient';
import { CALENDAR_DATE_FORMAT } from '../constants/calendar';
import type { UseCalendarStateResult } from '../hooks/useCalendarState';
import { getCategoryTypeByDate } from '../utils/getCategoryTypeByDate';
import { mapReflectionItems } from '../utils/mapReflectionItems';
import CalendarMonthGrid from './CalendarMonthGrid/CalendarMonthGrid';
import CalendarMonthHeader from './CalendarMonthHeader/CalendarMonthHeader';
import CalendarMonthWeekdays from './CalendarMonthWeekdays/CalendarMonthWeekdays';

interface CalendarMonthPropsWithSummary extends UseCalendarStateResult {
  onSelectSummary: (summary: SelectedSummaryCardData) => void;
}

const CalendarMonth = ({
  today,
  currentMonth,
  currentMonthLabel,
  selectedDate,
  days,
  goPrevMonth,
  goNextMonth,
  selectDate,
  onSelectSummary,
}: CalendarMonthPropsWithSummary) => {
  const formattedMonth = format(
    currentMonth,
    CALENDAR_DATE_FORMAT.monthRequest,
  );
  const { data } = useSuspenseMonthReflectionQuery({
    month: formattedMonth,
  });

  const categoryTypeByDate = useMemo(
    () => getCategoryTypeByDate(mapReflectionItems(data ?? [])),
    [data],
  );
  const reflectionByDate = useMemo(() => {
    const mapped = new Map<string, (typeof data)[number]>();

    for (const reflection of data ?? []) {
      mapped.set(reflection.reflectedAt.slice(0, 10), reflection);
    }

    return mapped;
  }, [data]);

  const handleSelectSummary = (date: Date) => {
    const dateKey = format(date, CALENDAR_DATE_FORMAT.dayKey);
    const reflection = reflectionByDate.get(dateKey);

    if (!reflection) {
      onSelectSummary({
        questionText: '회고를 기록하지 않았어요',
        reflectionText: '다른 날짜를 선택해 회고를 확인해 보세요.',
        reflectionId: null,
      });
      return;
    }

    onSelectSummary({
      questionText: reflection.question.content,
      reflectionText: reflection.content,
      reflectionId: reflection.id,
    });
  };

  return (
    <div className="space-y-3">
      <CalendarMonthHeader
        currentMonthLabel={currentMonthLabel}
        goPrevMonth={goPrevMonth}
        goNextMonth={goNextMonth}
      />

      <CalendarMonthWeekdays />
      <CalendarMonthGrid
        days={days}
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        today={today}
        categoryTypeByDate={categoryTypeByDate}
        selectDate={selectDate}
        onSelectSummary={handleSelectSummary}
      />
    </div>
  );
};

export default CalendarMonth;
