'use client';

import { format } from 'date-fns';
import { useMemo } from 'react';

import { useMonthReflectionQuery } from '../../reflection/queries/useMonthReflectionQuery';
import { useCalendarState } from '../hooks/useCalendarState';
import { getCategoryTypeByDate } from '../utils/getCategoryTypeByDate';
import { mapReflectionItems } from '../utils/mapReflectionItems';
import CalendarMonthGrid from './CalendarMonthGrid/CalendarMonthGrid';
import CalendarMonthHeader from './CalendarMonthHeader/CalendarMonthHeader';
import CalendarMonthWeekdays from './CalendarMonthWeekdays/CalendarMonthWeekdays';

const CalendarMonth = () => {
  const {
    today,
    currentMonth,
    currentMonthLabel,
    selectedDate,
    days,
    goPrevMonth,
    goNextMonth,
    selectDate,
  } = useCalendarState();
  const formattedMonth = format(currentMonth, 'yyyy-MM');
  const { data } = useMonthReflectionQuery({ month: formattedMonth });

  const categoryTypeByDate = useMemo(
    () => getCategoryTypeByDate(mapReflectionItems(data ?? [])),
    [data],
  );

  return (
    <div className="space-y-3">
      <CalendarMonthHeader
        currentMonthLabel={currentMonthLabel}
        goPrevMonth={goPrevMonth}
        goNextMonth={goNextMonth}
      />

      <CalendarMonthWeekdays />

      {/* TODO: 아이콘 바뀐걸로 변경해야 함. */}
      <CalendarMonthGrid
        days={days}
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        today={today}
        categoryTypeByDate={categoryTypeByDate}
        selectDate={selectDate}
      />
    </div>
  );
};

export default CalendarMonth;
