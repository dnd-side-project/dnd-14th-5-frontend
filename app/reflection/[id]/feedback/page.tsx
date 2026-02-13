import CompleteButton from '@/src/components/features/reflectionFeedback/CompleteButton/CompleteButton';
import ResultCard from '@/src/components/features/reflectionFeedback/ResultCard/ResultCard';
import BottomCTA from '@/src/components/layout/BottomCTA/BottomCTA';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';

const FeedbackPage = () => {
  return (
    <div className="flex h-dvh flex-col">
      <PageHeader title="피드백" />
      <div className="px-7.5">
        <ResultCard />
      </div>

      <BottomCTA>
        <CompleteButton />
      </BottomCTA>
    </div>
  );
};

export default FeedbackPage;
