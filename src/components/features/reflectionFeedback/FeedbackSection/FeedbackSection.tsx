'use client';

import { useRouter } from 'next/navigation';

import BottomCTA from '@/src/components/layout/BottomCTA/BottomCTA';
import Button from '@/src/components/ui/Button/Button';
import ErrorState from '@/src/components/ui/ErrorState/ErrorState';
import Skeleton from '@/src/components/ui/Skeleton/Skeleton';
import { type Category } from '@/src/lib/constants/character';
import { goToHome } from '@/src/lib/helpers/navigation';

import { useTodayReflectionQuery } from '../../reflection/queries/useTodayReflectionQuery';
import CompleteButton from '../CompleteButton/CompleteButton';
import ResultCard from '../ResultCard/ResultCard';

const FeedbackSection = () => {
  const router = useRouter();
  const { data, isPending, isError } = useTodayReflectionQuery({
    staleTime: 0,
    refetchOnMount: 'always',
    refetchInterval: (query) => {
      const reflection = query.state.data;
      const feedback = reflection?.feedback;
      const shouldPoll =
        reflection !== null &&
        (!feedback ||
          feedback.status === 'PENDING' ||
          feedback.status === 'PROCESSING');

      return shouldPoll ? 1000 : false;
    },
  });

  const feedback = data?.feedback;
  const isGenerating =
    data !== null &&
    (!feedback ||
      feedback.status === 'PENDING' ||
      feedback.status === 'PROCESSING');
  const hasError = isError || !feedback || feedback.status === 'FAILED';

  const feedbackContent = feedback?.content ?? '';
  const category = data?.question.category as Category;

  if (isPending || isGenerating) {
    return (
      <>
        <Skeleton className="h-117.5 w-full" ariaLabel="피드백 생성 중" />
        <BottomCTA>
          <Button label="피드백 생성 중..." disabled />
        </BottomCTA>
      </>
    );
  }

  if (hasError) {
    return (
      <ErrorState
        title="피드백을 불러오지 못했어요"
        description="잠시 후 다시 시도해 주세요."
        onRetry={() => goToHome(router)}
      />
    );
  }

  return (
    <section>
      <ResultCard feedback={feedbackContent} category={category} />
      <BottomCTA>
        <CompleteButton />
      </BottomCTA>
    </section>
  );
};

export default FeedbackSection;
