'use client';
import { useEffect, useRef } from 'react';

import BottomCTA from '@/src/components/layout/BottomCTA/BottomCTA';
import ErrorState from '@/src/components/ui/ErrorState/ErrorState';
import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

import CompleteButton from '../CompleteButton/CompleteButton';
import { useCreateReflectionFeedbackMutation } from '../queries/useCreateReflectionFeedbackMutation';
import ResultCard from '../ResultCard/ResultCard';

interface FeedbackSectionProps {
  reflectionId: number;
}

// TODO: 서버에서 category 내려주는거 반영해주면 그거에 맞춰서 변경 필요...
// TODO: post 요청 때문에 간헐적으로 무한 스켈레톤 오류가 발생해서 회고 등록 때 post 요청 하고, 필요한 값만 피드백 페이지로 넘기는 방식으로 수정해야 할 듯
const FeedbackSection = ({ reflectionId }: FeedbackSectionProps) => {
  const hasRequestedRef = useRef(false);
  const { mutate, data, isPending, isError } =
    useCreateReflectionFeedbackMutation(reflectionId);

  useEffect(() => {
    if (hasRequestedRef.current) {
      return;
    }

    hasRequestedRef.current = true;
    mutate();
  }, [mutate]);

  if (isPending) {
    return (
      <>
        <div className="px-7.5">
          <Skeleton className="h-117.5 w-full" ariaLabel="피드백 생성 중" />
        </div>
        <BottomCTA>
          <CompleteButton />
        </BottomCTA>
      </>
    );
  }

  if (isError) {
    return (
      <div className="px-7.5 py-7.5">
        <ErrorState
          title="피드백을 불러오지 못했어요"
          description="잠시 후 다시 시도해 주세요."
          onRetry={() => mutate()}
        />
      </div>
    );
  }

  const status = data?.status ?? '결과';
  const content = data?.content ?? '표시할 피드백이 없어요.';

  return (
    <>
      <div className="pt-10">
        <ResultCard content={content} status={status} />
      </div>
      <BottomCTA>
        <CompleteButton />
      </BottomCTA>
    </>
  );
};

export default FeedbackSection;
