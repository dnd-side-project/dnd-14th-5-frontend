'use client';

import Image from 'next/image';

import Badge from '@/src/components/ui/Badge/Badge';
import ErrorState from '@/src/components/ui/ErrorState/ErrorState';
import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

import type { Category} from '../../home/const/character';
import { CATEGORY_CHARACTER_MAP } from '../../home/const/character';
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

  // TODO: 타입 단언 없이 category가 Category 타입으로 추론되도록 변경 예정 (#74 PR 머지 후)
  const { src, alt, color } =
    CATEGORY_CHARACTER_MAP[data.question.category as Category];

  return (
    <article className="space-y-10">
      <section className="space-y-5">
        <Badge>나의 기록</Badge>

        <h1 className="text-heading-h4 text-primary">
          {data.question.content}
        </h1>
        <p className="text-body-s text-g-60">{data.content}</p>
      </section>

      <section className="bg-g-20 rounded-2xl p-4 space-y-3">
        <div className="flex flex-col items-center">
          <Image src={src} alt={alt} width={120} height={120} />
        </div>

        <p className="text-heading-h4 text-g-900">
          오늘은 {/* TODO: CATEGORY_MESSAGE_MAP 사용 (#50 PR 머지 후) */}
          <span style={{ color: `var(--color-${color})` }}>부정적 과거</span>를
          더 많이 떠올리셨어요!
        </p>

        <p className="text-body-s text-g-600">{data.feedback.content}</p>
      </section>
    </article>
  );
};

export default Detail;
