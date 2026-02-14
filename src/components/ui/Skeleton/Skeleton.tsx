import { cn } from '@/src/lib/helpers/cn';

interface SkeletonProps {
  className?: string;
  ariaLabel?: string;
}

const Skeleton = ({ className, ariaLabel }: SkeletonProps) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-g-0/20', className)}
      role="status"
      aria-label={ariaLabel ?? 'loading'}
    />
  );
};

export default Skeleton;
