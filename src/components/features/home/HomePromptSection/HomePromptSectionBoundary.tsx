'use client';

import { Suspense } from 'react';

import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

import HomePromptSection from './HomePromptSection';

const HomePromptSectionFallback = () => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-body-s text-g-100">오늘의 회고</p>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>
    </div>
  );
};

const HomePromptSectionBoundary = () => {
  return (
    <Suspense fallback={<HomePromptSectionFallback />}>
      <HomePromptSection />
    </Suspense>
  );
};

export default HomePromptSectionBoundary;
