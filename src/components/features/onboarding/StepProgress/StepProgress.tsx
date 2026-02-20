import { cn } from '@/src/lib/helpers/cn';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const StepProgress = ({ currentStep, totalSteps }: StepProgressProps) => {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${totalSteps}, 1fr)` }}
    >
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'h-1.5 rounded-2xl w-full',
            index <= currentStep ? 'bg-primary' : 'bg-white/20',
          )}
        />
      ))}
    </div>
  );
};

export default StepProgress;
