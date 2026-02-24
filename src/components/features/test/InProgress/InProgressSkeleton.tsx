import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

const InProgressSkeleton = () => {
  return (
    <div className="flex flex-col justify-between h-full pt-2">
      <Skeleton className="h-2" />
      <Skeleton className="h-140 py-20" />
      <div className="flex gap-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

export default InProgressSkeleton;
