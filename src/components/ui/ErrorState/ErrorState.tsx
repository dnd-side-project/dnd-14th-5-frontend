import Button from '@/src/components/ui/Button/Button';
import { cn } from '@/src/lib/helpers/cn';

import BottomCTA from '../../layout/BottomCTA/BottomCTA';

interface ErrorStateProps {
  title: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
  className?: HTMLDivElement['className'];
  titleClassName?: HTMLParagraphElement['className'];
  descriptionClassName?: HTMLParagraphElement['className'];
}

const ErrorState = ({
  title,
  description,
  retryLabel = '다시 시도',
  onRetry,
  className,
  titleClassName,
  descriptionClassName,
}: ErrorStateProps) => {
  return (
    <div
      className={cn(
        'flex w-full max-w-96 flex-col items-center gap-4 text-center',
        className,
      )}
    >
      <p className={cn('font-heading-h4', titleClassName)}>{title}</p>
      {description && (
        <p
          className={cn(
            'font-caption-n text-g-30 opacity-70',
            descriptionClassName,
          )}
        >
          {description}
        </p>
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
