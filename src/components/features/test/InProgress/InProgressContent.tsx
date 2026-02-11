import { type ChangeEvent } from 'react';

import Card from '../Card/Card';

interface InProgressContentProps {
  step: string;
  content: string;
  onRatingChange: (event: ChangeEvent<HTMLInputElement>) => void;
  remainQuestion: number;
  currentRating: number | null;
}

const InProgressContent = ({
  remainQuestion,
  step,
  content,
  onRatingChange,
  currentRating,
}: InProgressContentProps) => {
  return (
    <section className="relative">
      <div className="relative z-1">
        <Card
          onChange={onRatingChange}
          step={step}
          selectedValue={currentRating}
        >
          {content}
        </Card>
      </div>

      {remainQuestion > 0 && (
        <div className="*:bg-g-400 *:absolute *:inset-0 *:pointer-events-none *:rounded-2xl">
          <div className="-translate-y-6 scale-95 opacity-50" />
          {remainQuestion > 1 && (
            <div className="-translate-y-12 scale-90 opacity-30" />
          )}
        </div>
      )}
    </section>
  );
};

export default InProgressContent;
