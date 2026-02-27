'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '@/src/components/ui/Button/Button';
import ErrorState from '@/src/components/ui/ErrorState/ErrorState';
import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

import CharacterSummary from '../CharacterSummary/CharacterSummary';
import { useTestRecordQuery } from '../queries/useTestRecordQuery';
import ScoreGraph from '../ScoreGraph/ScoreGraph';

interface ResultProps {
  testRecordId: number;
}

const Result = ({ testRecordId }: ResultProps) => {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useTestRecordQuery({
    testRecordId,
  });

  const goHome = () => {
    router.push('/');
  };

  if (isPending) {
    return (
      <div className="space-y-5 mt-10">
        <Skeleton className="h-25" />
        <Skeleton className="h-40" />
        <Skeleton className="h-50" />
        <Skeleton className="h-10" />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="테스트 결과를 불러오지 못했어요."
        description="잠시 후 다시 시도해주세요."
        onRetry={() => refetch()}
        className="py-15"
      />
    );
  }

  return (
    <div className="flex flex-col justify-between gap-15 pb-8">
      <article>
        <CharacterSummary closestCategory={data.result.closestCategory} />
        <ScoreGraph scores={data.result.scores} />
      </article>

      <section className="flex flex-col items-center gap-3">
        <Button label="완료" onClick={goHome} className="h-10 text-g-900" />
        <Link
          className="text-primary font-caption-n underline underline-offset-4"
          href="/characters"
        >
          다른 캐릭터 알아보기
        </Link>
      </section>
    </div>
  );
};

export default Result;
