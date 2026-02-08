import Button from '@/src/components/ui/Button/Button';

import BottomCTA from '../../layout/BottomCTA/BottomCTA';

type ErrorStateProps = {
  title: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
};

const ErrorState = ({
  title,
  description,
  retryLabel = '다시 시도',
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex w-full max-w-96 flex-col items-center gap-4 text-center">
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
