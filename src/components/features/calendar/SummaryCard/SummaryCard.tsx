'use client';

import { useRouter } from 'next/navigation';

import Card from '@/src/components/ui/Card/Card';
import Icon from '@/src/components/ui/Icon/Icon';

import { useSuspenseTodayReflectionQuery } from '../../reflection/queries/useTodayReflectionQuery';

interface SelectedSummaryCardData {
  questionText: string;
  reflectionText: string;
  reflectionId: number | null;
}

interface SummaryCardProps {
  selectedSummary: SelectedSummaryCardData | null;
}

const SummaryCard = ({ selectedSummary }: SummaryCardProps) => {
  const router = useRouter();
  const { data } = useSuspenseTodayReflectionQuery();
  const hasSelectedDate = selectedSummary !== null;
  const selectedReflectionId = selectedSummary?.reflectionId ?? null;
  const hasSelectedReflection = selectedReflectionId !== null;
  const hasTodayReflectionContent = data.content !== null;

  const handleCardClick = () => {
    if (hasSelectedDate) {
      if (!hasSelectedReflection) return;
      router.push(`/reflection/${selectedReflectionId}`);
      return;
    }

    if (!hasTodayReflectionContent) {
      router.push('/reflection');
      return;
    }

    router.push(`/reflection/${data.id}`);
  };

  const questionText = hasSelectedDate
    ? (selectedSummary?.questionText ?? '회고를 기록하지 않았어요')
    : (data.question.content ?? '오늘의 질문이 없습니다.');
  const reflectionText = hasSelectedDate
    ? (selectedSummary?.reflectionText ??
      '다른 날짜를 선택해 회고를 확인해 보세요.')
    : (data.content ?? '아직 답변하지 않았어요!');
  const isCardClickable = hasSelectedDate ? hasSelectedReflection : true;
  const ariaLabel = '오늘 질문 상세 보기';

  return (
    <Card className="rounded-2xl bg-g-500 p-5">
      <button
        type="button"
        onClick={handleCardClick}
        aria-label={ariaLabel}
        className="w-full"
        disabled={!isCardClickable}
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-left font-body-m text-g-0">{questionText}</p>
          <Icon name="chevronLeft" size={24} className="pt-1 rotate-180" />
        </div>
      </button>
      <p className="pt-4 line-clamp-2 font-body-s text-g-80">
        {reflectionText}
      </p>
    </Card>
  );
};

export default SummaryCard;
