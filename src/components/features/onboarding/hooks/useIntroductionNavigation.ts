import { useRouter } from 'next/navigation';
import { type TouchEvent, useRef, useState } from 'react';

const SWIPE_THRESHOLD = 50;

interface UseIntroductionNavigationProps {
  initialStep: number;
  totalSteps: number;
}

const useIntroductionNavigation = ({
  initialStep,
  totalSteps,
}: UseIntroductionNavigationProps) => {
  const router = useRouter();
  const [step, setStep] = useState(initialStep);
  const touchStartX = useRef(0);

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleNext = () => {
    if (step === totalSteps) router.push('/login');
    else setStep(step + 1);
  };

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent) => {
    const diff = touchStartX.current - event.changedTouches[0].clientX;
    if (Math.abs(diff) < SWIPE_THRESHOLD) return;
    if (diff > 0) handleNext();
    else handlePrev();
  };

  return { step, handlePrev, handleNext, handleTouchStart, handleTouchEnd };
};

export default useIntroductionNavigation;
