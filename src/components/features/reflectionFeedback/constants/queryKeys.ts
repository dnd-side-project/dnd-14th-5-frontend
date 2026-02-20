export const reflectionFeedbackKeys = {
  all: ['reflectionFeedback'] as const,
  create: (id: number) =>
    [...reflectionFeedbackKeys.all, id, 'create'] as const,
};
