'use client';

import Card from '@/src/components/ui/Card/Card';
import Icon from '@/src/components/ui/Icon/Icon';
import Skeleton from '@/src/components/ui/Skeleton/Skeleton';
import { cn } from '@/src/lib/helpers/cn';

import type { GetTodayReflectionResponse } from '../../reflection/queries/useTodayReflectionQuery';
import { CATEGORY_CARD_CLASS_MAP } from '../constants/categoryCardClassMap';

interface SummaryCardProps {
  data?: GetTodayReflectionResponse;
  isPending: boolean;
}

const SummaryCard = ({ data, isPending }: SummaryCardProps) => {
  const todayCategory = data?.question.category;

  const handleCardClick = () => {
    // TODO: 카드 클릭 시 오늘의 회고 상세 페이지로 이동하도록 구현 필요
  };

  if (isPending) {
    return (
      <Card className="rounded-2xl bg-g-500 p-5">
        <div className="space-y-4">
          <Skeleton className="h-6 w-4/5" ariaLabel="오늘의 질문 로딩 중" />
          <Skeleton className="h-4 w-full" ariaLabel="오늘의 회고 로딩 중" />
        </div>
      </Card>
    );
  }

  const todayQuestion = data?.question.content ?? '오늘의 질문이 없습니다.';
  const todayReflection = data?.content ?? '오늘의 회고 답변이 없습니다.';

  return (
    // TODO: 디자인 물어보고 카드 스타일 업데이트 필요,
    <Card
      className={cn(
        'rounded-2xl bg-g-500 p-5',
        todayCategory && CATEGORY_CARD_CLASS_MAP[todayCategory],
      )}
    >
      <button
        type="button"
        onClick={handleCardClick}
        aria-label="오늘 질문 상세 보기"
        className="w-full"
      >
        <div className="flex items-start justify-between gap-4">
          <p
            className={cn(
              'text-left text-body-m',
              data ? 'text-g-900' : 'text-g-0',
            )}
          >
            {todayQuestion}
          </p>
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
