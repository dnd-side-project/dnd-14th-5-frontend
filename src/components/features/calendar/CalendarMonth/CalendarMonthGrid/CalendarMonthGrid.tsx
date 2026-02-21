'use client';

import {
  type CalendarDayCellType,
  getCalendarDayCells,
} from '../../utils/getCalendarDayCells';
import type { CalendarDayCategoryType } from '../CalendarDayCell/CalendarDayCell';
import CalendarDayCell from '../CalendarDayCell/CalendarDayCell';

interface CalendarMonthGridProps {
  days: Date[];
  currentMonth: Date;
  selectedDate: Date | null;
  today: Date;
  categoryTypeByDate: Map<string, CalendarDayCategoryType>;
  selectDate: (date: Date) => void;
}

const CalendarMonthGrid = ({
  days,
  currentMonth,
  selectedDate,
  today,
  categoryTypeByDate,
  selectDate,
}: CalendarMonthGridProps) => {
  const dayCells: CalendarDayCellType[] = getCalendarDayCells({
    days,
    currentMonth,
    selectedDate,
    today,
    categoryTypeByDate,
  });

  const handleDateSelect = (date: Date) => {
    selectDate(date);
  };

  return (
    <ul className="grid grid-cols-7 gap-y-2">
      {dayCells.map((dayCell) => {
        return (
          <li key={dayCell.key} className="flex justify-center">
            {dayCell.isCurrentMonth ? (
              <CalendarDayCell
                day={dayCell.blobProps.day}
                categoryType={dayCell.categoryType}
                isFuture={dayCell.isFuture}
                hasRecord={dayCell.blobProps.hasRecord}
                isOutlined={dayCell.blobProps.isOutlined}
                onClick={() => handleDateSelect(dayCell.date)}
              />
            ) : (
              <span aria-hidden className="h-10 w-10" />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default CalendarMonthGrid;
