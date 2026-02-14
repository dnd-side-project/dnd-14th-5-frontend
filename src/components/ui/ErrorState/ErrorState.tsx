import Button from '@/src/components/ui/Button/Button';
import { cn } from '@/src/lib/helpers/cn';

import BottomCTA from '../../layout/BottomCTA/BottomCTA';

interface ErrorStateProps {
  title: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
  className?: HTMLDivElement['className'];
}

const ErrorState = ({
  title,
  description,
  retryLabel = '다시 시도',
  onRetry,
  className,
}: ErrorStateProps) => {
  return (
    <div
      className={cn(
        'flex w-full max-w-96 flex-col items-center gap-4 text-center',
        className,
      )}
    >
      <p className="text-heading-h4 text-g-0">{title}</p>
      {description && (
        <p className="text-caption-n text-g-30 opacity-70">{description}</p>
      )}
      {onRetry && (
        <BottomCTA>
          <Button label={retryLabel} onClick={onRetry} variant="secondary" />
        </BottomCTA>
      )}
    </div>
  );
};

export default ErrorState;
