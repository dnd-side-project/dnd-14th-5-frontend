import ProgressBar from '@/src/components/ui/ProgressBar/ProgressBar';
import { formatTwoDigitNumber } from '@/src/lib/helpers/formatTwoDigitNumber';

import { useTestProgress } from '../hooks/useTestProgress';
import { useTestQuestionsQuery } from '../queries/useTestQuestionsQuery';
import InProgressContent from './InProgressContent';
import InProgressNavigation from './InProgressNavigation';

interface InProgressProps {
  testId: number;
  testRecordId: number;
}

const InProgress = ({ testId, testRecordId }: InProgressProps) => {
  const { data: questions, isError } = useTestQuestionsQuery({ testId });
  const {
    currentRating,
    currentQuestionIndex,
    handleRatingChange,
    handleNext,
    handlePrev,
    isNextButtonDisabled,
    isPrevButtonDisabled,
  } = useTestProgress({ testRecordId });

  if (!questions || isError) {
    return (
      // TODO: ErrorState 컴포넌트로 수정
      <div className="flex justify-center items-center py-20">
        테스트 문항을 불러오지 못했습니다.
      </div>
    );
  }

  const totalQuestions = questions.length;
  const remainQuestion = totalQuestions - currentQuestionIndex - 1;
  const { id: questionId, sequence, content } = questions[currentQuestionIndex];
  const prevQuestionId = questions[currentQuestionIndex - 1]?.id;

  return (
    <div className="space-y-16 mt-5">
      <ProgressBar current={currentQuestionIndex + 1} max={totalQuestions} />

      <InProgressContent
        step={formatTwoDigitNumber(sequence)}
        remainQuestion={remainQuestion}
        content={content}
        currentRating={currentRating}
        onRatingChange={handleRatingChange}
      />

      <InProgressNavigation
        onPrev={() => handlePrev(prevQuestionId)}
        onNext={() => handleNext(totalQuestions, questionId)}
        isNextButtonDisabled={isNextButtonDisabled(totalQuestions)}
        isPrevButtonDisabled={isPrevButtonDisabled}
      />
    </div>
  );
};

export default InProgress;
