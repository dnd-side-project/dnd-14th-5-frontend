'use client';

import { useStepProgress } from '@/src/components/features/onboarding/hooks/useStepProgress';
import FirstStep from '@/src/components/features/onboarding/Step/FirstStep';
import SecondStep from '@/src/components/features/onboarding/Step/SecondStep';
import ThirdStep from '@/src/components/features/onboarding/Step/ThirdStep';
import StepProgress from '@/src/components/features/onboarding/StepProgress/StepProgress';
import Button from '@/src/components/ui/Button/Button';

const STEPS = [
  { id: 0, component: FirstStep },
  { id: 1, component: SecondStep },
  { id: 2, component: ThirdStep },
];

const OnboardingContent = () => {
  const totalSteps = STEPS.length;
  const { currentStep, handleNextStep, goLogin } = useStepProgress({
    totalSteps,
  });

  const CurrentStepComponent = STEPS[currentStep].component;
  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div className="flex flex-col justify-between h-full">
      <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
      <CurrentStepComponent />
      <Button
        label={isLastStep ? '시작하기' : '다음'}
        onClick={isLastStep ? goLogin : handleNextStep}
        className="h-10"
      />
    </div>
  );
};

export default OnboardingContent;
