'use client';

import { useRouter } from 'next/navigation';

import Card from '@/src/components/ui/Card/Card';
import Icon from '@/src/components/ui/Icon/Icon';

import { useSuspenseTodayReflectionQuery } from '../../reflection/queries/useTodayReflectionQuery';

const SummaryCard = () => {
  const router = useRouter();
  const { data } = useSuspenseTodayReflectionQuery();

  // TODO: 오늘의 회고 있으면 해당 페이지로 이동, 없으면 회고 작성하는 페이지로 이동? or 걍 막기?
  const handleCardClick = () => {
    router.push(`/reflection/${data.id}`);
  };

  const todayQuestion = data?.question.content ?? '오늘의 질문이 없습니다.';
  const todayReflection = data?.content ?? '오늘의 회고 답변이 없습니다.';

  return (
    <Card className="rounded-2xl bg-g-500 p-5">
      <button
        type="button"
        onClick={handleCardClick}
        aria-label="오늘 질문 상세 보기"
        className="w-full"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-left text-body-m text-g-0">{todayQuestion}</p>
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
