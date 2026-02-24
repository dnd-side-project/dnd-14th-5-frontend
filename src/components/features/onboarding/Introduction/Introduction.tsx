'use client';

import StepProgress from '@/src/components/features/onboarding/Introduction/IntroductionProgress';
import BottomCTA from '@/src/components/layout/BottomCTA/BottomCTA';
import ErrorState from '@/src/components/ui/ErrorState/ErrorState';
import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

import { useIntroductionsQuery } from '../queries/useIntroductionsQuery';
import NextStepButton from './IntroductionNavigation';
import OnboardingStep from './IntroductionStep';

interface OnboardingContentProps {
  currentStep?: number;
  version: number;
}

const OnboardingContent = ({
  currentStep = 1,
  version,
}: OnboardingContentProps) => {
  const { data, isPending, isError, refetch } = useIntroductionsQuery({
    version,
  });

  if (isPending) {
    return (
      <div className="flex flex-col justify-between h-full">
        <Skeleton className="h-2" />
        <Skeleton className="h-100 my-25" />
        <Skeleton className="h-10" />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="온보딩 소개를 불러오지 못했어요."
        description="잠시 후 다시 시도해주세요."
        className="py-15"
        retryLabel="다시 시도하기"
        onRetry={() => refetch()}
      />
    );
  }

  const totalSteps = data.length;
  const step = Math.min(Math.max(currentStep, 1), totalSteps);

  const { title, description, imageUrl } = data[step - 1];

  return (
    <div>
      <StepProgress currentStep={step} totalSteps={totalSteps} />

      <OnboardingStep
        title={title}
        description={description}
        imageUrl={imageUrl}
      />

      <BottomCTA>
        <NextStepButton currentStep={step} totalSteps={totalSteps} />
      </BottomCTA>
    </div>
  );
};

export default OnboardingContent;
