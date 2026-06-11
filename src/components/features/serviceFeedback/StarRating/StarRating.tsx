'use client';

import { useState } from 'react';

import Icon from '@/src/components/ui/Icon/Icon';
import { cn } from '@/src/lib/helpers/cn';

const STARS = [1, 2, 3, 4, 5] as const;

interface StarRatingProps {
  onChange?: (rating: number) => void;
  className?: string;
}

const StarRating = ({ onChange, className }: StarRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  const handleClick = (star: number) => {
    const next = rating === star ? 0 : star;
    setRating(next);
    setHovered(next);
    onChange?.(next);
  };

  return (
    <div className={cn('flex justify-center gap-2', className)}>
      {STARS.map((star) => (
        <button
          key={star}
          type="button"
          aria-label={`${star}점`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
        >
          <Icon
            name={star <= (hovered || rating) ? 'starFilled' : 'starOutline'}
            size={32}
            decorative
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
