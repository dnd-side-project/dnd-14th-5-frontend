import FeedbackSection from '@/src/components/features/reflectionFeedback/FeedbackSection/FeedbackSection';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';

const FeedbackPage = () => {
  return (
    <>
      <PageHeader title="피드백" />
      <div className="pt-10">
        <FeedbackSection />
      </div>
    </>
  );
};

export default FeedbackPage;
