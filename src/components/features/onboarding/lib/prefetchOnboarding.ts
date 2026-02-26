import type { QueryClient } from '@tanstack/react-query';

import { DIRECT_API_BASE_URL } from '@/src/lib/config/env';

import { ONBOARDING_QUERY_KEYS } from '../constants/queryKeys';
import { ONBOARDING_ENDPOINTS } from '../constants/url';

interface PrefetchingOnboardingProps {
  queryClient: QueryClient;
  version: number;
}

export const prefetchOnboarding = async ({
  queryClient,
  version,
}: PrefetchingOnboardingProps) => {
  await queryClient.prefetchQuery({
    queryKey: ONBOARDING_QUERY_KEYS.introductions(version),
    queryFn: async () => {
      const response = await fetch(
        `${DIRECT_API_BASE_URL}${ONBOARDING_ENDPOINTS.introductions}?version=${version}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch introductions');
      }

      return response.json();
    },
  });
};
