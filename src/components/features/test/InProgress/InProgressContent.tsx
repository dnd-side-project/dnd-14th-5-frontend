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
  direction: number;
}

const InProgressContent = ({
  remainQuestion,
  step,
  content,
  onRatingChange,
  currentRating,
  direction,
}: InProgressContentProps) => {
  const cardVariants = {
    initial: (direction: number) => ({
      y: direction === 1 ? -24 : 0,
      scale: direction === 1 ? 0.95 : 1,
      opacity: direction === 1 ? 0.5 : 0,
      x: direction === 1 ? 0 : '100%',
    }),
    animate: {
      y: 0,
      scale: 1,
      opacity: 1,
      x: 0,
    },
    exit: (direction: number) => ({
      x: direction === 1 ? '100%' : 0,
      y: direction === 1 ? 0 : -24,
      scale: direction === 1 ? 1 : 0.95,
      opacity: direction === 1 ? 0 : 0.5,
    }),
  };

  const backgroundCardCount = Math.min(remainQuestion, 2);

  return (
    <section className="relative w-full overflow-x-clip">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          className="relative z-10 w-full"
          custom={direction}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
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

      {backgroundCardCount > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          <AnimatePresence initial={false}>
            {[...Array(backgroundCardCount)].map((_, index) => {
              const currentOffset = (index + 1) * 24;
              const currentScale = 1 - (index + 1) * 0.05;
              const currentOpacity = 0.5 - index * 0.2;

              return (
                <motion.div
                  key={`bg-${remainQuestion}-${index}`}
                  className="absolute inset-0 rounded-2xl bg-g-400"
                  style={{
                    y: -currentOffset,
                    scale: currentScale,
                    opacity: currentOpacity,
                  }}
                  transition={{
                    type: 'tween',
                    duration: 0.35,
                    ease: 'easeOut',
                  }}
                />
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};

export default InProgressContent;
