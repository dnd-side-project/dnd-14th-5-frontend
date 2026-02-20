import FeedbackSection from '@/src/components/features/reflectionFeedback/FeedbackSection/FeedbackSection';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';

interface FeedbackPageProps {
  params: Promise<{ id: string }>;
}

const FeedbackPage = async ({ params }: FeedbackPageProps) => {
  const { id } = await params;
  const reflectionId = Number(id);
  
  return (
    <div className="flex h-dvh flex-col">
      <PageHeader title="피드백" />

      <FeedbackSection reflectionId={reflectionId} />
    </div>
  );
};

export default FeedbackPage;
