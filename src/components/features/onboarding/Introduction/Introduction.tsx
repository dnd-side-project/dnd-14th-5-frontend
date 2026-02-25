'use client';

import IntroductionProgress from '@/src/components/features/onboarding/Introduction/IntroductionProgress';
import BottomCTA from '@/src/components/layout/BottomCTA/BottomCTA';
import ErrorState from '@/src/components/ui/ErrorState/ErrorState';
import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

import { useIntroductionsQuery } from '../queries/useIntroductionsQuery';
import IntroductionNavigation from './IntroductionNavigation';
import IntroductionStep from './IntroductionStep';

interface IntroductionProps {
  currentStep?: number;
  version: number;
}

const Introduction = ({ currentStep = 1, version }: IntroductionProps) => {
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
      <IntroductionProgress currentStep={step} totalSteps={totalSteps} />

      <IntroductionStep
        title={title}
        description={description}
        imageUrl={imageUrl}
      />

      <BottomCTA>
        <IntroductionNavigation currentStep={step} totalSteps={totalSteps} />
      </BottomCTA>
    </div>
  );
};

export default Introduction;
