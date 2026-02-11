'use client';

import { useRouter } from 'next/navigation';

import { useReflectionForm } from '@/src/components/features/reflection/hooks/useReflectionForm';
import { useTodayQuestionQuery } from '@/src/components/features/reflection/queries/useTodayQuestionQuery';
import QuestionCard from '@/src/components/features/reflection/QuestionCard/QuestionCard';
import ReflectionInputSection from '@/src/components/features/reflection/ReflectionInputSection/ReflectionInputSection';
import BottomCTA from '@/src/components/layout/BottomCTA/BottomCTA';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import Button from '@/src/components/ui/Button/Button';
import ErrorState from '@/src/components/ui/ErrorState/ErrorState';
import Icon from '@/src/components/ui/Icon/Icon';
import { cn } from '@/src/lib/helpers/cn';
import { goBackOrHome } from '@/src/lib/helpers/navigation';

import styles from './page.module.css';

const ReflectionPage = () => {
  const router = useRouter();
  const { data, isLoading, isError, isSuccess, refetch } =
    useTodayQuestionQuery();

  const questionContent = data?.content ?? '';
  const { content, isSubmitting, handleContentChange, submit } =
    useReflectionForm();
  const isSubmitDisabled =
    !isSuccess || content.trim().length === 0 || isSubmitting;
  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    submit();
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <PageHeader
        title="기록하기"
        leftIcon={<Icon name="chevronLeft" size={28} alt="back" />}
        onLeftClick={() => goBackOrHome(router)}
      />
      <div
        className={cn(
          'min-h-0 flex-1 overflow-y-auto overscroll-contain',
          styles.scrollArea,
        )}
      >
        {isError ? (
          <div className="flex h-full items-center justify-center px-7.5">
            <ErrorState
              title="오늘의 질문을 불러오지 못했어요."
              description="잠시 후 다시 시도해주세요."
              onRetry={() => refetch()}
            />
          </div>
        ) : (
          <div className="mx-auto flex flex-col gap-6 px-7.5 pt-10 pb-24">
            <QuestionCard
              isLoading={isLoading}
              isReady={isSuccess}
              questionContent={questionContent}
            />

            <ReflectionInputSection
              disabled={!isSuccess}
              value={content}
              onChange={handleContentChange}
            />
          </div>
        )}
      </div>

      {!isError && (
        <BottomCTA>
          <Button
            label={isSubmitting ? '기록 중...' : '기록 완료'}
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
          />
        </BottomCTA>
      )}
    </div>
  );
};

export default ReflectionPage;
