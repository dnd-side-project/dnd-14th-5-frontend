'use client';

import Image from 'next/image';

import { useReflectionForm } from '@/src/components/features/reflection/hooks/useReflectionForm';
import { useTodayQuestionQuery } from '@/src/components/features/reflection/queries/useTodayQuestionQuery';
import TextArea from '@/src/components/features/reflection/TextArea/TextArea';
import BottomCTA from '@/src/components/layout/BottomCTA/BottomCTA';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import Button from '@/src/components/ui/Button/Button';
import ErrorState from '@/src/components/ui/ErrorState/ErrorState';
import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

import styles from './page.module.css';

const ReflectionPage = () => {
  const { data, isLoading, isError, refetch } = useTodayQuestionQuery();

  const questionContent = data?.content ?? '';
  const isQuestionReady = !isLoading && !isError;
  const { content, isSubmitDisabled, isSubmitting, setContent, handleSubmit } =
    useReflectionForm(isQuestionReady);

  if (isError) {
    return (
      <div className="flex h-dvh flex-col overflow-hidden">
        <PageHeader
          title="기록하기"
          leftIcon={
            <Image
              src="/icons/chevron-left.svg"
              alt="back"
              width={28}
              height={28}
            />
          }
        />
        <main className="flex flex-1 items-center justify-center px-7.5">
          <ErrorState
            title="오늘의 질문을 불러오지 못했어요."
            description="잠시 후 다시 시도해주세요."
            onRetry={() => refetch()}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <PageHeader
        title="기록하기"
        leftIcon={
          <Image
            src="/icons/chevron-left.svg"
            alt="back"
            width={28}
            height={28}
          />
        }
      />
      <main
        className={`min-h-0 flex-1 overflow-y-auto overscroll-contain ${styles.scrollArea}`}
      >
        <div className="mx-auto flex flex-col gap-6 px-7.5 pt-10 pb-24">
          <section>
            <div className="w-full h-28 rounded-lg bg-g-400 p-4">
              {isLoading && (
                <Skeleton
                  className="h-full py-2"
                  ariaLabel="오늘의 질문 불러오는 중"
                />
              )}

              {isQuestionReady && (
                <div className="flex h-full flex-col justify-between">
                  <p className="text-heading-h4 text-g-0">{questionContent}</p>
                  <p className="text-caption-n text-g-30 opacity-50">
                    지금 떠오르는 감정이나 생각을 부담없이 작성해보세요!
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <p className="px-2 text-heading-h4 text-g-0">오늘 나의 생각은?</p>
            <TextArea
              disabled={!isQuestionReady}
              value={content}
              onChange={(e) => setContent(e.currentTarget.value)}
            />
          </section>
        </div>
      </main>

      <BottomCTA>
        <Button
          label={isSubmitting ? '기록 중...' : '기록 완료'}
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        />
      </BottomCTA>
    </div>
  );
};

export default ReflectionPage;
