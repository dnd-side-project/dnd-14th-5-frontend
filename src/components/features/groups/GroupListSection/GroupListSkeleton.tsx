import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

const GroupListSkeleton = () => (
  <div className="flex h-28 items-start pt-4 gap-4 overflow-x-auto">
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="flex flex-col items-center gap-2 w-17.5 shrink-0"
      >
        <Skeleton className="w-13.75 h-13.75 rounded-[10px]" />
        <Skeleton className="w-14 h-3" />
      </div>
    ))}
  </div>
);

export default GroupListSkeleton;
