import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

type QuestionCardProps = {
  isLoading: boolean;
  isReady: boolean;
  questionContent: string;
};

const QuestionCard = ({
  isLoading,
  isReady,
  questionContent,
}: QuestionCardProps) => {
  return (
    <section>
      <div className="w-full rounded-lg bg-g-400 p-4">
        {isLoading && (
          <Skeleton className="h-20 py-2" ariaLabel="오늘의 질문 불러오는 중" />
        )}

        {isReady && !isLoading && (
          <div className="flex h-full flex-col justify-start gap-2">
            <p className="text-heading-h4 text-g-0">{questionContent}</p>
            <p className="text-caption-n text-g-30 opacity-50">
              지금 떠오르는 감정이나 생각을 부담없이 작성해보세요!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuestionCard;
