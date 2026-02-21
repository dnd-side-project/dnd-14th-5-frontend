import Button from '@/src/components/ui/Button/Button';

interface InProgressNavigation {
  onPrev: () => void;
  onNext: () => void;
  isNextButtonDisabled: boolean;
  isPrevButtonDisabled: boolean;
}

const InProgressNavigation = ({
  onPrev,
  onNext,
  isNextButtonDisabled,
  isPrevButtonDisabled,
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
        label="다음"
        onClick={onNext}
        disabled={isNextButtonDisabled}
        className="col-span-2"
      />
    </div>
  );
};

export default InProgressNavigation;
