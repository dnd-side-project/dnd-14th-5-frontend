'use client';

import { format } from 'date-fns';
import { useMemo } from 'react';

import ErrorState from '@/src/components/ui/ErrorState/ErrorState';
import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

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
  const { data, isPending, isError } = useMonthReflectionQuery({
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

      {isPending ? (
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 42 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-10 w-10 rounded-full bg-g-500"
              ariaLabel="캘린더 로딩 중"
            />
          ))}
        </div>
      ) : isError ? (
        <ErrorState
          title="이번 달 회고를 불러오지 못했어요."
          className="w-full h-70 py-10"
        />
      ) : (
        // TODO: 아이콘 바뀐걸로 변경해야 함.
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
