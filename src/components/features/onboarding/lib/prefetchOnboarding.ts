import type { QueryClient } from '@tanstack/react-query';

import { ONBOARDING_QUERY_KEYS } from '../constants/queryKeys';
import { introductions } from '../queries/useIntroductionsQuery';

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
    queryFn: () => introductions({ version }),
  });
};
