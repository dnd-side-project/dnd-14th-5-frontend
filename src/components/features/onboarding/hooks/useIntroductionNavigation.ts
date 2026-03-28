import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const SWIPE_THRESHOLD = 50;

interface UseIntroductionNavigationProps {
  step: number;
  totalSteps: number;
}

const useIntroductionNavigation = ({
  step,
  totalSteps,
}: UseIntroductionNavigationProps) => {
  const router = useRouter();
  const touchStartX = useRef(0);

  const handlePrev = () => {
    if (step > 1) router.push(`/onboarding?step=${step - 1}`);
  };

  const handleNext = () => {
    if (step === totalSteps) router.push('/login');
    else router.push(`/onboarding?step=${step + 1}`);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < SWIPE_THRESHOLD) return;
    if (diff > 0) handleNext();
    else handlePrev();
  };

  return { handlePrev, handleNext, handleTouchStart, handleTouchEnd };
};

export default useIntroductionNavigation;
