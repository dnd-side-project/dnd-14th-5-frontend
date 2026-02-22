'use client';

import { useMemo } from 'react';

import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

import type { GetMonthReflectionResponse } from '../../reflection/queries/useMonthReflectionQuery';
import { CALENDAR_GRID_CELL_COUNT } from '../constants/calendar';
import type { UseCalendarStateResult } from '../hooks/useCalendarState';
import { getCategoryTypeByDate } from '../utils/getCategoryTypeByDate';
import { mapReflectionItems } from '../utils/mapReflectionItems';
import CalendarMonthGrid from './CalendarMonthGrid/CalendarMonthGrid';
import CalendarMonthHeader from './CalendarMonthHeader/CalendarMonthHeader';
import CalendarMonthWeekdays from './CalendarMonthWeekdays/CalendarMonthWeekdays';

interface CalendarMonthProps extends UseCalendarStateResult {
  data?: GetMonthReflectionResponse;
  isPending: boolean;
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
  data,
  isPending,
}: CalendarMonthProps) => {
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

      {isPending ? (
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: CALENDAR_GRID_CELL_COUNT }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-10 w-10 rounded-full bg-g-500"
              ariaLabel="캘린더 로딩 중"
            />
          ))}
        </div>
      ) : (
        <CalendarMonthGrid
          days={days}
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          today={today}
          categoryTypeByDate={categoryTypeByDate}
          selectDate={selectDate}
        />
      )}
    </div>
  );
};

export default CalendarMonth;
