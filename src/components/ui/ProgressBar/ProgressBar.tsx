import { cn } from '@/src/lib/helpers/cn';

interface ProgressBarProps {
  current: number;
  max: number;
}

function ProgressBar({ current, max }: ProgressBarProps) {
  return (
    <progress
      value={current}
      max={max}
      className={cn(
        'h-2 w-full rounded-2xl',

        '[&::-webkit-progress-bar]:rounded-2xl',
        '[&::-webkit-progress-bar]:bg-white/20',
        '[&::-webkit-progress-value]:rounded-2xl',
        '[&::-webkit-progress-value]:bg-primary',

        '[&::-moz-progress-bar]:rounded-2xl',
        '[&::-moz-progress-bar]:bg-primary',
      )}
    />
  );
}

export default ProgressBar;
