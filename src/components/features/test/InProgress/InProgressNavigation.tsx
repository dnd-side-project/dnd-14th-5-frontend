import Button from '@/src/components/ui/Button/Button';

interface InProgressNavigation {
  onPrev: () => void;
  onNext: () => void;
  isNextButtonDisabled: boolean;
  isPrevButtonDisabled: boolean;
  isCompleting: boolean;
  isLastQuestion: boolean;
}

const InProgressNavigation = ({
  onPrev,
  onNext,
  isNextButtonDisabled,
  isPrevButtonDisabled,
  isCompleting,
  isLastQuestion,
}: InProgressNavigation) => {
  return (
    <div className="gap-3 grid grid-cols-3">
      <Button
        label="이전"
        onClick={onPrev}
        variant="secondary"
        disabled={isPrevButtonDisabled}
      />
      <Button
        label={isLastQuestion ? '완료' : '다음'}
        onClick={onNext}
        disabled={isCompleting || isNextButtonDisabled}
        className="col-span-2"
      />
    </div>
  );
};

export default InProgressNavigation;
