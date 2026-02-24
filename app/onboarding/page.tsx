import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { prefetchOnboarding } from '@/src/components/features/onboarding/lib/prefetchOnboarding';
import OnboardingContent from '@/src/components/features/onboarding/OnboardingContent/OnboardingContent';
import { getQueryClient } from '@/src/lib/helpers/getQueryClient';

interface OnboardingPageProps {
  searchParams: Promise<{ step?: string }>;
}

const VERSION = 1;

const OnboardingPage = async ({ searchParams }: OnboardingPageProps) => {
  const { step } = await searchParams;

  const parsed = Number(step);
  const currentStep = Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;

  const queryClient = getQueryClient();
  await prefetchOnboarding({ queryClient, version: VERSION });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OnboardingContent currentStep={currentStep} version={VERSION} />
    </HydrationBoundary>
  );
};

export default OnboardingPage;
