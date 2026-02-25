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

  const handleClick = () => {
    if (isLastStep) {
      router.push('/login');
    } else {
      router.push(`/onboarding?step=${currentStep + 1}`);
    }
  };

  return (
    <Button
      label={isLastStep ? '시작하기' : '다음'}
      onClick={handleClick}
      className="h-10"
    />
  );
};

export default IntroductionNavigation;
