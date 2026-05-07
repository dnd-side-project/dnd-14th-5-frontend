'use client';

import HomeActionsSection from '@/src/components/features/home/HomeActionsSection/HomeActionsSection';
import HomeTodayQuestionSectionBoundary from '@/src/components/features/home/HomeTodayQuestionSectionBoundary/HomeTodayQuestionSectionBoundary';

const HomeClientSections = () => {
  return (
    <div className="flex flex-1 flex-col">
      <HomeTodayQuestionSectionBoundary />
      <HomeActionsSection />
    </div>
  );
};

export default HomeClientSections;
