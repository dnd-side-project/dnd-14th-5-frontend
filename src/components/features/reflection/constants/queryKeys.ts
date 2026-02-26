export const reflectionKeys = {
  all: ['reflection'] as const,
  todayQuestion: () => [...reflectionKeys.all, 'todayQuestion'] as const,
  submitReflection: () => [...reflectionKeys.all, 'submitReflection'] as const,
  monthReflection: (month: string) =>
    [...reflectionKeys.all, 'monthReflection', month] as const,
  todayReflection: () => [...reflectionKeys.all, 'todayReflection'] as const,
  changeTodayQuestion: () =>
    [...reflectionKeys.all, 'changeTodayQuestion'] as const,
};
