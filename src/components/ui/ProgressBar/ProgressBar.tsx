'use client';

import { animate } from 'motion';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/src/lib/helpers/cn';

interface ProgressBarProps {
  current: number;
  max: number;
}

function ProgressBar({ current, max }: ProgressBarProps) {
  const progressRef = useRef<HTMLProgressElement>(null);
  const [animatedValue, setAnimatedValue] = useState(current);
  const animatedValueRef = useRef(0);

  useEffect(() => {
    const from = animatedValueRef.current;
    const to = current;

    const controls = animate(from, to, {
      duration: 0.4,
      ease: 'easeOut',
      onUpdate: (latest) => {
        animatedValueRef.current = latest;
        setAnimatedValue(latest);
      },
    });

    return () => controls.stop();
  }, [current]);

  return (
    <progress
      ref={progressRef}
      value={animatedValue}
      max={max}
      className={cn(
        'h-2 w-full rounded-2xl',

        '[&::-webkit-progress-bar]:rounded-2xl',
        '[&::-webkit-progress-bar]:bg-white/20',
        '[&::-webkit-progress-value]:rounded-2xl',
        '[&::-webkit-progress-value]:bg-primary',
        '[&::-webkit-progress-value]:transition-all',

        '[&::-moz-progress-bar]:rounded-2xl',
        '[&::-moz-progress-bar]:bg-primary',
      )}
    />
  );
}

export default ProgressBar;
