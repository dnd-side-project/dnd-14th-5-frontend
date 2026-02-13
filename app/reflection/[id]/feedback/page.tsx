'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import CompleteButton from '@/src/components/features/reflectionFeedback/CompleteButton/CompleteButton';
import { useCreateReflectionFeedbackMutation } from '@/src/components/features/reflectionFeedback/queries/useCreateReflectionFeedbackMutation';
import ResultCard from '@/src/components/features/reflectionFeedback/ResultCard/ResultCard';
import BottomCTA from '@/src/components/layout/BottomCTA/BottomCTA';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';

const FeedbackPage = () => {
  const params = useParams<{ id: string }>();
  const reflectionId = Number(params.id);
  const hasRequestedRef = useRef(false);

  const { mutate, data, isPending, isError } =
    useCreateReflectionFeedbackMutation(reflectionId);

  useEffect(() => {
    if (!Number.isFinite(reflectionId) || hasRequestedRef.current) {
      return;
    }

    hasRequestedRef.current = true;
    mutate();
  }, [mutate, reflectionId]);

  let status = data?.status ?? '결과';
  let content = data?.content ?? '표시할 피드백이 없어요.';

  if (isError) {
    // TODO: ErrorState 브랜치 병합 후 아래 ResultCard fallback을 ErrorState로 교체
    // return <ErrorState title="피드백을 불러오지 못했어요" ... />
    status = '피드백 생성에 실패했어요';
    content = '피드백을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.';
  }

  if (isPending) {
    // TODO: Skeleton 브랜치 병합 후 아래 ResultCard fallback을 FeedbackSkeleton으로 교체
    // return <FeedbackSkeleton />
    status = '피드백을 생성 중이에요';
    content = '잠시만 기다려 주세요.';
  }

  return (
    <div className="flex h-dvh flex-col">
      <PageHeader title="피드백" />
      <div className="px-7.5">
        <ResultCard content={content} status={status} />
      </div>

      <BottomCTA>
        <CompleteButton />
      </BottomCTA>
    </div>
  );
};

export default FeedbackPage;
