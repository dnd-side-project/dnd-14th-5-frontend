import type { CalendarDayCategoryType } from '../CalendarDayBlob/CalendarDayBlob';
import type { ReflectionCategoryItem } from './mapReflectionItems';

const CATEGORY_TO_BLOB_TYPE: Record<string, CalendarDayCategoryType> = {
  PAST_NEGATIVE: 'past-negative',
  PAST_POSITIVE: 'past-positive',
  PRESENT_HEDONISTIC: 'present-hedonistic',
  PRESENT_FATALISTIC: 'present-fatalistic',
  FUTURE: 'future-oriented',
};

/**
 * 회고 목록을 날짜별 카테고리 타입 맵으로 변환
 * key는 `yyyy-MM-dd` 형식이며, value는 `CalendarDayCategoryType`
 */
export const getCategoryTypeByDate = (
  data: ReflectionCategoryItem[],
): Map<string, CalendarDayCategoryType> => {
  const categoryTypeByDate = new Map<string, CalendarDayCategoryType>();

  for (const { category, createdAt } of data) {
    const type = CATEGORY_TO_BLOB_TYPE[category];
    if (!type) continue;

    const dateKey = createdAt.slice(0, 10);
    categoryTypeByDate.set(dateKey, type);
  }

  return categoryTypeByDate;
};
