'use client';

import { useRouter } from 'next/navigation';

import Button from '@/src/components/ui/Button/Button';

interface IntroductionNavigationProps {
  currentStep: number;
  totalSteps: number;
}

const IntroductionNavigation = ({
  currentStep,
  totalSteps,
}: IntroductionNavigationProps) => {
  const router = useRouter();
  const isLastStep = currentStep === totalSteps;

  const handlePrev = () => {
    if (currentStep > 1) {
      router.push(`/onboarding?step=${currentStep - 1}`);
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      router.push('/login');
    } else {
      router.push(`/onboarding?step=${currentStep + 1}`);
    }
  };

  return (
    <section className="gap-4 flex w-full">
      {currentStep > 1 && (
        <Button label="이전" onClick={handlePrev} variant="secondary" />
      )}
      <Button label="다음" onClick={handleNext} />
    </section>
  );
};

export default IntroductionNavigation;
