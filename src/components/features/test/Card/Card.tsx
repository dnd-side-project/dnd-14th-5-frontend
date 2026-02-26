import { type ChangeEvent } from 'react';

import Radio from '@/src/components/ui/Radio/Radio';

import { ratingOptions } from '../constants/ratingOptions';

interface CardProps {
  children: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  step: string;
  selectedValue: number | null;
}

const Card = ({ children, onChange, step, selectedValue }: CardProps) => {
  return (
    <div className="bg-g-400 rounded-2xl p-6 py-8 space-y-10">
      <div className="space-y-3">
        <p className="font-body-s text-primary">STEP {step}</p>
        <p className="font-heading-h4 break-keep min-h-13">{children}</p>
      </div>
      <ul className="flex flex-col space-y-4">
        {ratingOptions.map((option) => (
          <li key={option.value}>
            <Radio
              name="rating"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={onChange}
            >
              {option.label}
            </Radio>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
