'use client';

import HomeActionsSection from '@/src/components/features/home/HomeActionsSection/HomeActionsSection';
import HomeTodayQuestionSectionBoundary from '@/src/components/features/home/HomeTodayQuestionSectionBoundary/HomeTodayQuestionSectionBoundary';
import { useServiceFeedbackModal } from '@/src/components/features/serviceFeedback/hooks/useServiceFeedbackModal';
import ServiceFeedbackModal from '@/src/components/features/serviceFeedback/ServiceFeedbackModal/ServiceFeedbackModal';

const HomeClientSections = () => {
  const { show, dismiss } = useServiceFeedbackModal();

  return (
    <div className="flex flex-1 flex-col">
      {show && <ServiceFeedbackModal onDismiss={dismiss} />}
      <HomeTodayQuestionSectionBoundary />
      <HomeActionsSection />
    </div>
  );
};

export default HomeClientSections;
