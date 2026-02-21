import { CATEGORY_MESSAGE_MAP } from '../constants/categoryMessages';

export const getCategoryMessage = (category: string): string => {
  return (
    CATEGORY_MESSAGE_MAP[category] ??
    '오늘은 나를 차분하게 돌아보는 시간을 가졌어요.'
  );
};
