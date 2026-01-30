import { useState } from 'react';

import ProgressBar from '@/src/components/ui/ProgressBar/ProgressBar';

import Card from '../Card/Card';

const InProgress = () => {
  const [currentRating, setCurrentRating] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(100); // TODO: API에서 전체 질문 수 받아오기

  const handleRatingChange = (rating: number) => {
    setCurrentRating(rating);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setCurrentRating(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setCurrentRating(null); // API: null로 초기화하지 않고 이전에 사용자가 답했던 값을 API vs 상태로
    }
  };

  return (
    <div className="w-full space-y-7">
      {/* TODO: Header 컴포넌트로 교체 */}
      <h1 className="text-heading-h3 text-center">ZTPI 테스트</h1>

      <ProgressBar current={currentQuestionIndex + 1} max={totalQuestions} />

      <section className="pt-17">
        <div className="relative">
          {currentQuestionIndex < totalQuestions - 2 && (
            <>
              <div className="bg-g-50 absolute inset-0 -translate-y-15 scale-88 opacity-50 pointer-events-none z-0 rounded-2xl" />
              <div className="bg-g-50 absolute inset-0 -translate-y-28 scale-78 opacity-30 pointer-events-none z-[-1] rounded-2xl" />
            </>
          )}

          {/* 현재 카드 */}
          <div className="relative z-10">
            <Card
              question="과거를 되돌아보는 것이 즐거움을 주나요?"
              onRatingChange={handleRatingChange}
            />
          </div>
        </div>
      </section>

      {/* TODO: 버튼 컴포넌트로 교체 */}
      <div className="*:w-full flex *:h-14 gap-3 *:rounded-2xl">
        <button
          className="bg-g-50 text-g-600"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          이전
        </button>
        <button
          className="bg-g-500 text-g-30"
          onClick={handleNext}
          disabled={
            currentQuestionIndex === totalQuestions - 1 ||
            currentRating === null
          }
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default InProgress;
