'use client';

import Button from '@/src/components/ui/Button/Button';

interface IntroductionNavigationProps {
  isFirstStep: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const IntroductionNavigation = ({
  isFirstStep,
  onPrev,
  onNext,
}: IntroductionNavigationProps) => {
  return (
    <section className="gap-4 flex w-full">
      {!isFirstStep && (
        <Button label="이전" onClick={onPrev} variant="secondary" />
      )}
      <Button label="다음" onClick={onNext} />
    </section>
  );
};

export default IntroductionNavigation;
