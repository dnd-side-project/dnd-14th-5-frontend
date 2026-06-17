export const STATISTICS_ENDPOINTS = {
  statistics: '/statistics',
  detail: (category: string) => `/statistics/${category}`,
} as const;
