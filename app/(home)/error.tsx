'use client';

import ErrorState from '@/src/components/ui/ErrorState/ErrorState';

interface HomeErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const HomeError = ({ error: _error, reset }: HomeErrorProps) => {
  return (
    <div className="flex h-dvh justify-center pt-32">
      <ErrorState
        title="문제가 발생했어요."
        description="잠시 후 다시 시도해주세요."
        onRetry={reset}
      />
    </div>
  );
};

export default HomeError;
