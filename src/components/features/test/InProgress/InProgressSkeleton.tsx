import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

const InProgressSkeleton = () => {
  return (
    <div className="flex flex-col min-h-full pt-2">
      <Skeleton className="h-2" />
      <div className="flex flex-1 items-center justify-center py-6">
        <Skeleton className="h-140 w-full" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

export default InProgressSkeleton;
