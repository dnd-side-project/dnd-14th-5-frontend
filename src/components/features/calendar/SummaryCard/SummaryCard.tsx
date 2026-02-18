'use client';

import Card from '@/src/components/ui/Card/Card';
import Icon from '@/src/components/ui/Icon/Icon';

import { useTodayReflectionQuery } from '../../reflection/queries/useTodayReflectionQuery';

const SummaryCard = () => {
  const { data } = useTodayReflectionQuery();

  const todayQuestion = data?.question.content ?? '오늘의 질문이 없습니다.';
  const todayReflection = data?.content ?? '오늘의 회고 답변이 없습니다.';
  const todayCategory = data?.question.category;

  const handleCardClick = () => {
    // TODO: 카드 클릭 시 오늘의 회고 상세 페이지로 이동하도록 구현 필요
    console.log('오늘의 질문 카드 클릭됨');
  };

  return (
    // TODO: 카드 배경은 감정상태 색상의 50컬러, Stroke는 감정상태 색상의 200컬러: API에서 오늘의 category 받아와야 함.
    <Card className="rounded-2xl bg-g-500 p-5">
      <button
        type="button"
        onClick={handleCardClick}
        aria-label="오늘 질문 상세 보기"
        className="w-full"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-left text-body-m text-g-900">{todayQuestion}</p>
          <Icon name="chevronLeft" size={24} className="pt-1 rotate-180" />
        </div>
      </button>
      <p className="pt-4 line-clamp-2 text-body-s text-g-80">
        {todayReflection}
      </p>
    </Card>
  );
};

export default SummaryCard;
