export const ONBOARDING_QUERY_KEYS = {
  all: ['introduction'] as const,
  introductions: (version: number) =>
    [...ONBOARDING_QUERY_KEYS.all, version] as const,
};
