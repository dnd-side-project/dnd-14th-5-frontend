'use client';

import { format } from 'date-fns';
import { useMemo } from 'react';

import { useSuspenseMonthReflectionQuery } from '../../reflection/queries/useMonthReflectionQuery';
import { CALENDAR_DATE_FORMAT } from '../constants/calendar';
import type { UseCalendarStateResult } from '../hooks/useCalendarState';
import { getCategoryTypeByDate } from '../utils/getCategoryTypeByDate';
import { mapReflectionItems } from '../utils/mapReflectionItems';
import CalendarMonthGrid from './CalendarMonthGrid/CalendarMonthGrid';
import CalendarMonthHeader from './CalendarMonthHeader/CalendarMonthHeader';
import CalendarMonthWeekdays from './CalendarMonthWeekdays/CalendarMonthWeekdays';

type CalendarMonthProps = UseCalendarStateResult;

const CalendarMonth = ({
  today,
  currentMonth,
  currentMonthLabel,
  selectedDate,
  days,
  goPrevMonth,
  goNextMonth,
  selectDate,
}: CalendarMonthProps) => {
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
      />
    </div>
  );
};

export default CalendarMonth;
