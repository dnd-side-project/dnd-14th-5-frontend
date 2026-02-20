import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useStepProgress = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const goLogin = () => {
    router.push('/login');
  };

  return { currentStep, handleNextStep, goLogin };
};
