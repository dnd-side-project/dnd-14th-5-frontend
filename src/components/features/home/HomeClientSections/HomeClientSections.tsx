'use client';

import dynamic from 'next/dynamic';

// TODO: SSR 인증 쿠키/토큰 갱신 흐름 정리 후 client-only 우회(ssr:false) 제거 필요
const HomeTodayQuestionSectionBoundary = dynamic(
  () =>
    import('@/src/components/features/home/HomeTodayQuestionSectionBoundary/HomeTodayQuestionSectionBoundary'),
  { ssr: false },
);

const HomeActionsSection = dynamic(
  () =>
    import('@/src/components/features/home/HomeActionsSection/HomeActionsSection'),
  { ssr: false },
);

const HomeClientSections = () => {
  return (
    <div className="flex flex-1 flex-col">
      <HomeTodayQuestionSectionBoundary />
      <HomeActionsSection />
    </div>
  );
};

export default HomeClientSections;
