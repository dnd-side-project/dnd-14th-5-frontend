export const reflectionFeedbackKeys = {
  all: ['reflectionFeedback'] as const,
  create: (id: number | string) =>
    [...reflectionFeedbackKeys.all, id, 'create'] as const,
};
