import { type ChangeEvent, useState } from 'react';

import { ratingOptions } from '@/lib/constants/ratingOptions';
import Radio from '@/src/components/ui/Radio/Radio';

interface CardProps {
  question: string;
  onRatingChange: (rating: number) => void;
}

const Card = ({ question, onRatingChange }: CardProps) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rating = +event.target.value;
    setSelectedRating(rating);
    onRatingChange(rating);
  };

  return (
    <div className="bg-g-50 rounded-2xl p-6 py-10">
      <p className="text-lg font-semibold mb-4 w-45 h-25">{question}</p>
      <ul className="flex flex-col space-y-3 *:bg-white *:p-3 *:rounded-lg">
        {ratingOptions.map((option) => (
          <li key={option.value}>
            <Radio
              name="rating"
              label={option.label}
              value={option.value}
              checked={selectedRating === option.value}
              onChange={handleRatingChange}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
