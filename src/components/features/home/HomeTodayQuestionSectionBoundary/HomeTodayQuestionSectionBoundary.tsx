'use client';

import { Suspense } from 'react';

import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

import { useTodayQuestionSuspenseQuery } from '../../reflection/queries/useTodayQuestionQuery';
import HomeCharacterSection from '../HomeCharacterSection/HomeCharacterSection';
import HomePromptSection from '../HomePromptSection/HomePromptSection';

const HomeTodayQuestionSection = () => {
  const { data } = useTodayQuestionSuspenseQuery();

  return (
    <>
      <HomePromptSection todayQuestion={data.content} />
      <HomeCharacterSection category={data.category} />
    </>
  );
};

const HomeTodayQuestionSectionFallback = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="font-body-s text-g-100">오늘의 회고</p>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-16 w-full rounded-lg" />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center py-7.5">
        <Skeleton
          className="h-58 w-58 rounded-full"
          ariaLabel="캐릭터 로딩 중"
        />
      </div>
    </>
  );
};

const HomeTodayQuestionSectionBoundary = () => {
  return (
    <Suspense fallback={<HomeTodayQuestionSectionFallback />}>
      <HomeTodayQuestionSection />
    </Suspense>
  );
};

export default HomeTodayQuestionSectionBoundary;
