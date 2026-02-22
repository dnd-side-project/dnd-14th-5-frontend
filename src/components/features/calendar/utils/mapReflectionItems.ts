interface MonthReflectionItem {
  id: number;
  question: {
    category: string;
  };
  reflectedAt: string;
}

export interface ReflectionCategoryItem {
  id: number;
  category: string;
  reflectedAt: string;
}

/**
 * 내 회고 전체 조회 응답에서 캘린더 계산에 필요한 필드만 추출
 */
export const mapReflectionItems = (
  data: MonthReflectionItem[],
): ReflectionCategoryItem[] =>
  data.map(({ id, question: { category }, reflectedAt }) => ({
    id,
    category,
    reflectedAt,
  }));
