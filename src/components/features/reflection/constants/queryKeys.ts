export const reflectionKeys = {
  all: ['reflection'] as const,
  todayQuestion: () => [...reflectionKeys.all, 'todayQuestion'] as const,
};
