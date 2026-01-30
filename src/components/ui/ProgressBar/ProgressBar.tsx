import { calculatePercentage } from '@/lib/helpers/calculateProgress';

interface ProgressBarProps {
  current: number;
  max: number;
}

function ProgressBar({ current, max }: ProgressBarProps) {
  return (
    <div className="w-full bg-g-40 rounded-full h-3">
      <div
        className="bg-g-300 h-3 rounded-full text-xs flex items-center justify-center text-white"
        style={{ width: `${calculatePercentage({ current, max })}%` }}
      />
    </div>
  );
}

export default ProgressBar;
