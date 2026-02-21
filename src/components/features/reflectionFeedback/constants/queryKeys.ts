export const reflectionFeedbackKeys = {
  all: ['reflectionFeedback'] as const,
  create: () => [...reflectionFeedbackKeys.all, 'create'] as const,
};
