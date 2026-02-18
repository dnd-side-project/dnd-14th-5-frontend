import { usePathname, useRouter } from 'next/navigation';
import { type ChangeEvent, useState } from 'react';

import { useCompleteTestMutation } from '../queries/useCompleteTestMutation';
import { usePatchTestResponseMutation } from '../queries/usePatchTestResponseMutation';
import { usePostQuestionResponseMutation } from '../queries/usePostQuestionResponseMutation';
import { useTestResponsesQuery } from '../queries/useTestResponseQuery';

interface UseTestProgressProps {
  testRecordId: number;
}

export const useTestProgress = ({ testRecordId }: UseTestProgressProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data } = useTestResponsesQuery({ testRecordId });
  const { mutate: postQuestionResponse } = usePostQuestionResponseMutation({
    testRecordId,
  });
  const { mutate: patchQuestionResponse } = usePatchTestResponseMutation({
    testRecordId,
  });
  const { mutate: completeTest } = useCompleteTestMutation({ testRecordId });

  const [currentRating, setCurrentRating] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentRating(+event.target.value);
  };

  const handleNext = (totalQuestions: number, questionId: number) => {
    if (currentRating === null) return;

    setDirection(1);

    const isLastQuestion = currentQuestionIndex + 1 === totalQuestions;

    const onMutationSuccess = () => {
      if (isLastQuestion) {
        completeTest(undefined, {
          onSuccess: (data) =>
            router.push(`${pathname}/complete?resultId=${data.id}`),
        });
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
        setCurrentRating(null);
      }
    };

    const responseId = data?.find((item) => item.questionId === questionId)?.id;
    const score = data?.find((item) => item.questionId === questionId)?.score;

    if (responseId === undefined) {
      postQuestionResponse(
        {
          questionId,
          score: currentRating,
        },
        {
          onSuccess: onMutationSuccess,
        },
      );
    } else if (score !== currentRating) {
      patchQuestionResponse(
        { score: currentRating, responseId },
        {
          onSuccess: onMutationSuccess,
        },
      );
    } else if (isLastQuestion) {
      completeTest();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setCurrentRating(null);
    }
  };

  const handlePrev = (questionId: number) => {
    if (currentQuestionIndex <= 0) return;

    setDirection(-1);

    const score = data?.find((item) => item.questionId === questionId)?.score;

    if (score === undefined) return;

    setCurrentRating(score);
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const isNextButtonDisabled = (totalQuestions: number) =>
    currentQuestionIndex + 1 > totalQuestions || currentRating === null;

  const isPrevButtonDisabled = currentQuestionIndex === 0;

  return {
    currentRating,
    currentQuestionIndex,
    direction,
    handleRatingChange,
    handleNext,
    handlePrev,
    isNextButtonDisabled,
    isPrevButtonDisabled,
  };
};
