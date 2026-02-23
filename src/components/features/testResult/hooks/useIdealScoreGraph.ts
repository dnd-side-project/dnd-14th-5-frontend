import { useEffect, useRef, useState } from 'react';

import { type ResponseType as TestRecordResponseType } from '../queries/useTestRecordQuery';

type UseIdealScoreGraphProps = Pick<TestRecordResponseType['result'], 'scores'>;

export const useIdealScoreGraph = ({ scores }: UseIdealScoreGraphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLImageElement | null)[]>([]);
  const [linePoints, setLinePoints] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const updatePoints = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      const points = dotsRef.current
        .filter(Boolean)
        .map((dot) => {
          if (!dot) return null;
          const rect = dot.getBoundingClientRect();
          return {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2,
          };
        })
        .filter((p): p is { x: number; y: number } => p !== null);

      setLinePoints(points);
    };

    const resizeObserver = new ResizeObserver(updatePoints);
    resizeObserver.observe(containerRef.current);

    updatePoints();

    return () => resizeObserver.disconnect();
  }, [scores]);

  return { containerRef, dotsRef, linePoints };
};
