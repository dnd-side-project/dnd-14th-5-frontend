import { usePathname, useRouter } from 'next/navigation';
import { type ChangeEvent, useState } from 'react';

import { useCompleteTestMutation } from '../queries/useCompleteTestMutation';
import { usePatchTestResponseMutation } from '../queries/usePatchTestResponseMutation';
import { usePostQuestionResponseMutation } from '../queries/usePostQuestionResponseMutation';
import { useTestResponsesQuery } from '../queries/useTestResponseQuery';

interface UseTestProgressProps {
  testRecordId: number;
  totalQuestions: number;
}

export const useTestProgress = ({
  testRecordId,
  totalQuestions,
}: UseTestProgressProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data, isPending } = useTestResponsesQuery({
    testRecordId,
  });
  const { mutate: postQuestionResponse } = usePostQuestionResponseMutation({
    testRecordId,
  });
  const { mutate: patchQuestionResponse } = usePatchTestResponseMutation({
    testRecordId,
  });
  const { mutate: completeTest, isPending: isCompleting } =
    useCompleteTestMutation({ testRecordId });

  const [currentRating, setCurrentRating] = useState<number | null>(null);
  const [manualIndex, setManualIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);

  const currentQuestionIndex = Math.min(
    manualIndex ?? data?.length ?? 0,
    Math.max(totalQuestions - 1, 0),
  );

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentRating(+event.target.value);
  };

  const handleCompleteTest = () => {
    completeTest(undefined, {
      onSuccess: (data) =>
        router.push(`${pathname}/complete?resultId=${data.id}`),
    });
  };

  const isLastQuestion = currentQuestionIndex + 1 === totalQuestions;

  const handleNext = (questionId: number, nextQuestionId?: number) => {
    if (currentRating === null) return;

    setDirection(1);

    const moveToNext = () => {
      if (isLastQuestion) {
        handleCompleteTest();
      } else {
        setManualIndex(currentQuestionIndex + 1);

        const nextScore =
          nextQuestionId !== undefined
            ? data?.find((item) => item.questionId === nextQuestionId)?.score
            : undefined;
        setCurrentRating(nextScore ?? null);
      }
    };

    const currentResponse = data?.find(
      (item) => item.questionId === questionId,
    );
    const responseId = currentResponse?.id;
    const score = currentResponse?.score;

    if (responseId === undefined) {
      postQuestionResponse(
        {
          questionId,
          score: currentRating,
        },
        {
          onSuccess: moveToNext,
        },
      );
    } else if (score !== currentRating) {
      patchQuestionResponse(
        { score: currentRating, responseId },
        {
          onSuccess: moveToNext,
        },
      );
    } else {
      moveToNext();
    }
  };

  const handlePrev = (questionId: number) => {
    if (currentQuestionIndex <= 0) return;

    setDirection(-1);

    const score = data?.find((item) => item.questionId === questionId)?.score;

    setCurrentRating(score ?? null);
    setManualIndex(currentQuestionIndex - 1);
  };

  const isNextButtonDisabled =
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
    isResponsesPending: isPending,
    isCompleting,
    isLastQuestion,
  };
};
