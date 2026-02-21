'use client';

import Badge from '@/src/components/ui/Badge/Badge';
import ErrorState from '@/src/components/ui/ErrorState/ErrorState';
import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

import { useReflectionDetail } from '../queries/useReflectionDetail';

interface DetailProps {
  reflectionId: number;
}

const Detail = ({ reflectionId }: DetailProps) => {
  const { data, isPending, isError, refetch } = useReflectionDetail({
    reflectionId,
  });

  if (isPending) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-10" />
        <Skeleton className="h-40" />
        <Skeleton className="h-30" />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="회고를 불러오는 데 실패했어요."
        description="잠시 후 다시 시도해주세요."
        onRetry={refetch}
        className="py-15"
      />
    );
  }

  return (
    <section className="space-y-10">
      <div className="space-y-5">
        <Badge>나의 기록</Badge>

        <h1 className="text-heading-h4 text-primary">
          {data.question.content}
        </h1>
        <p className="text-body-s text-g-60">{data.content}</p>
      </div>

      <div className="bg-g-20 rounded-2xl p-4 space-y-3">
        <p className="text-heading-h4 text-g-900">
          {/* TODO: 홈화면 PR 머지 후 반영 예정 */}
          오늘은 <span className="text-r-300">부정적 과거</span>를 더 많이
          떠올리셨어요!
        </p>
        <p className="text-body-s text-g-600">{data.feedback?.content}</p>
      </div>
    </section>
  );
};

export default Detail;
