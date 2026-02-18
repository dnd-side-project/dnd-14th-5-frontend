import { format, isAfter, isSameDay, isSameMonth, startOfDay } from 'date-fns';

import type { CalendarDayCategoryType } from '../CalendarDayCell/CalendarDayCell';

interface GetCalendarDayCellsParams {
  days: Date[];
  currentMonth: Date;
  selectedDate: Date | null;
  today: Date;
  categoryTypeByDate: Map<string, CalendarDayCategoryType>;
}

interface CalendarDayBlobProps {
  day: number;
  hasRecord: boolean;
  isOutlined: boolean;
}

export interface CalendarDayCellType {
  key: string;
  isCurrentMonth: boolean;
  date: Date;
  isFuture: boolean;
  categoryType: CalendarDayCategoryType | undefined;
  blobProps: CalendarDayBlobProps;
}

/**
 * 42칸 캘린더 날짜 배열을 화면 렌더링용 셀 데이터로 변환
 */
export const getCalendarDayCells = ({
  days,
  currentMonth,
  selectedDate,
  today,
  categoryTypeByDate,
}: GetCalendarDayCellsParams): CalendarDayCellType[] => {
  const todayStart = startOfDay(today);

  return days.map((day) => {
    const isCurrentMonth = isSameMonth(day, currentMonth);
    const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
    const dayStart = startOfDay(day);
    const isToday = isSameDay(dayStart, todayStart);
    const isOutlined = selectedDate ? isSelected : isToday;
    const isFuture = isAfter(dayStart, todayStart);
    const dayKey = format(day, 'yyyy-MM-dd');
    const categoryType = categoryTypeByDate.get(dayKey);
    const hasRecord = Boolean(categoryType);

    return {
      key: day.toISOString(),
      isCurrentMonth,
      date: day,
      isFuture,
      categoryType,
      blobProps: {
        day: day.getDate(),
        hasRecord,
        isOutlined,
      },
    };
  });
};
