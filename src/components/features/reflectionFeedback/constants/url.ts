export const REFLECTION_FEEDBACK_ENDPOINTS = {
  createFeedback: (id: number) => `/reflections/${id}/feedback`,
} as const;
