import ErrorState from '@/src/components/ui/ErrorState/ErrorState';
import ProgressBar from '@/src/components/ui/ProgressBar/ProgressBar';
import { formatTwoDigitNumber } from '@/src/lib/helpers/formatTwoDigitNumber';

import { useTestProgress } from '../hooks/useTestProgress';
import { useTestQuestionsQuery } from '../queries/useTestQuestionsQuery';
import InProgressContent from './InProgressContent';
import InProgressNavigation from './InProgressNavigation';
import InProgressSkeleton from './InProgressSkeleton';

interface InProgressProps {
  testId: number;
  testRecordId: number;
}

const InProgress = ({ testId, testRecordId }: InProgressProps) => {
  const {
    data: questions,
    isError,
    isPending,
    refetch,
  } = useTestQuestionsQuery({ testId });

  const {
    currentRating,
    currentQuestionIndex,
    direction,
    handleRatingChange,
    handleNext,
    handlePrev,
    isNextButtonDisabled,
    isPrevButtonDisabled,
  } = useTestProgress({ testRecordId });

  if (isPending) {
    return <InProgressSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        title="테스트 문항을 불러오지 못했어요."
        description="잠시 후 다시 시도해주세요."
        onRetry={refetch}
        className="py-15"
      />
    );
  }

  const totalQuestions = questions.length;
  const remainQuestion = totalQuestions - currentQuestionIndex - 1;
  const { id: questionId, sequence, content } = questions[currentQuestionIndex];
  const prevQuestionId = questions[currentQuestionIndex - 1]?.id;

  return (
    <div className="flex flex-col h-full pt-3">
      <ProgressBar current={currentQuestionIndex + 1} max={totalQuestions} />

      <div className="flex-1 flex items-center justify-center">
        <InProgressContent
          step={formatTwoDigitNumber(sequence)}
          remainQuestion={remainQuestion}
          content={content}
          currentRating={currentRating}
          onRatingChange={handleRatingChange}
          direction={direction}
        />
      </div>

      <InProgressNavigation
        onPrev={() => handlePrev(prevQuestionId)}
        onNext={() => handleNext(totalQuestions, questionId, nextQuestionId)}
        isNextButtonDisabled={isNextButtonDisabled(totalQuestions)}
        isPrevButtonDisabled={isPrevButtonDisabled}
      />
    </div>
  );
};

export default InProgress;
