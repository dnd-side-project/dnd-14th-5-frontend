import { type ChangeEvent } from 'react';

interface DontShowAgainCheckboxProps {
  dontShowAgain: boolean;
  handleDontShowAgain: (event: ChangeEvent<HTMLInputElement>) => void;
}

const DontShowAgainCheckbox = ({
  dontShowAgain,
  handleDontShowAgain,
}: DontShowAgainCheckboxProps) => {
  return (
    <div className="flex items-center justify-start gap-2 py-2">
      <input
        type="checkbox"
        id="dontShowAgain"
        checked={dontShowAgain}
        onChange={handleDontShowAgain}
        className="rounded-md border-2 border-g-300 checked:bg-b-300 checked:border-b-300 cursor-pointer"
      />
      <label
        htmlFor="dontShowAgain"
        className="text-body-s text-g-80 cursor-pointer select-none"
      >
        다시 보지 않기
      </label>
    </div>
  );
};

export default DontShowAgainCheckbox;
