import { cn } from '@/src/lib/helpers/cn';

interface StepProgressProps {
  currentStep: number;
}

const TOTAL_STEPS = 3;

const StepProgress = ({ currentStep }: StepProgressProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
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
