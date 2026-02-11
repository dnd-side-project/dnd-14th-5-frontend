'use client';

import { AnimatePresence, motion } from 'motion/react';
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
    <section className="relative h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="relative z-10"
          initial={{
            scale: 0.97,
            y: -12,
            opacity: 0.6,
          }}
          animate={{
            scale: 1,
            y: 0,
            opacity: 1,
          }}
          exit={{
            x: '100%',
            opacity: 0,
            transition: { duration: 0.25, ease: 'easeIn' },
          }}
          transition={{
            type: 'tween',
            duration: 0.35,
            ease: 'easeOut',
          }}
        >
          <Card
            onChange={onRatingChange}
            step={step}
            selectedValue={currentRating}
          >
            {content}
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(Math.min(remainQuestion, 2))].map((_, index) => {
          const offset = (index + 1) * 24;
          const scale = 1 - (index + 1) * 0.05;
          const opacity = 0.5 - index * 0.2;

          return (
            <motion.div
              key={`bg-${remainQuestion}-${index}`}
              layout
              className="absolute inset-0 rounded-2xl bg-g-400"
              animate={{
                y: -offset,
                scale,
                opacity,
              }}
              transition={{
                type: 'tween',
                duration: 0.35,
                ease: 'easeOut',
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default InProgressContent;
