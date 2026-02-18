import type { CalendarDayBlobType } from '../CalendarDayBlob/CalendarDayBlob';
import type { ReflectionCategoryItem } from './mapReflectionItems';

const CATEGORY_TO_BLOB_TYPE: Record<string, CalendarDayBlobType> = {
  PAST_NEGATIVE: 'past-negative',
  PAST_POSITIVE: 'past-positive',
  PRESENT_HEDONISTIC: 'present-hedonistic',
  PRESENT_FATALISTIC: 'present-fatalistic',
  FUTURE: 'future-oriented',
};

/**
 * 회고 목록을 날짜별 캘린더 아이콘 타입 맵으로 변환
 * key는 `yyyy-MM-dd` 형식이며, value는 `CalendarDayBlobType`
 */
export const getRecordedTypeByDate = (
  data: ReflectionCategoryItem[],
): Map<string, CalendarDayBlobType> => {
  const recordedTypeByDate = new Map<string, CalendarDayBlobType>();

  for (const { category, createdAt } of data) {
    const type = CATEGORY_TO_BLOB_TYPE[category];
    if (!type) continue;

    const dateKey = createdAt.slice(0, 10);
    recordedTypeByDate.set(dateKey, type);
  }

  return recordedTypeByDate;
};
