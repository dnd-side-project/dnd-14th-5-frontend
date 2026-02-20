import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface UseStepProgress {
  totalSteps: number;
}

export const useStepProgress = ({ totalSteps }: UseStepProgress) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goLogin = () => {
    router.push('/login');
  };

  return { currentStep, handleNextStep, goLogin };
};
