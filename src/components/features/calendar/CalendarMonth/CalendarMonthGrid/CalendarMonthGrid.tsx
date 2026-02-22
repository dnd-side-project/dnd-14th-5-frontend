'use client';

import { useRouter } from 'next/navigation';

import {
  type CalendarDayCellType,
  getCalendarDayCells,
} from '../../utils/getCalendarDayCells';
import type { CalendarDayRecordByDateItem } from '../../utils/getCategoryTypeByDate';
import CalendarDayCell from '../CalendarDayCell/CalendarDayCell';

interface CalendarMonthGridProps {
  days: Date[];
  currentMonth: Date;
  selectedDate: Date | null;
  today: Date;
  categoryTypeByDate: Map<string, CalendarDayRecordByDateItem>;
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
  const router = useRouter();

  const dayCells: CalendarDayCellType[] = getCalendarDayCells({
    days,
    currentMonth,
    selectedDate,
    today,
    categoryTypeByDate,
  });

  const handleDateSelect = (date: Date, reflectionId?: number) => {
    selectDate(date);

    if (reflectionId === undefined) return;
    router.push(`/reflection/${reflectionId}`);
  };

  return (
    <ul className="grid grid-cols-7 gap-y-2">
      {dayCells.map((dayCell) => {
        return (
          <li key={dayCell.key} className="flex justify-center">
            {dayCell.isCurrentMonth ? (
              <CalendarDayCell
                day={dayCell.cellProps.day}
                categoryType={dayCell.categoryType}
                isFuture={dayCell.isFuture}
                hasRecord={dayCell.cellProps.hasRecord}
                isOutlined={dayCell.cellProps.isOutlined}
                onClick={() =>
                  handleDateSelect(dayCell.date, dayCell.reflectionId)
                }
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
