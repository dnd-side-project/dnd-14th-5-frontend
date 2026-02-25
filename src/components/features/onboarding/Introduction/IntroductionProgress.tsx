import { cn } from '@/src/lib/helpers/cn';

interface IntroductionProgressProps {
  currentStep: number;
  totalSteps: number;
}

const IntroductionProgress = ({
  currentStep,
  totalSteps,
}: IntroductionProgressProps) => {
  return (
    <div className="flex gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'h-1.5 flex-1 rounded-2xl',
            index + 1 <= currentStep ? 'bg-primary' : 'bg-g-0/20',
          )}
        />
      ))}
    </div>
  );
};

export default IntroductionProgress;
