import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

const CharactersFallback = () => {
  return (
    <div className="py-1">
      <Skeleton className="h-10" />
      <div className="space-y-5 my-8">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
    </div>
  );
};

export default CharactersFallback;
