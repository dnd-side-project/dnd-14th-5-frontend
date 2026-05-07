'use client';

import Link from 'next/link';

import Card from '@/src/components/ui/Card/Card';

import { useTodayQuestionSuspenseQuery } from '../../reflection/queries/useTodayQuestionQuery';
import { useSuspenseTodayReflectionQuery } from '../../reflection/queries/useTodayReflectionQuery';
import type { SelectedSummaryCardData } from '../CalendarPageClient/CalendarPageClient';
import QuestionRow from './QuestionRow';

interface SummaryCardProps {
  selectedSummary: SelectedSummaryCardData | null;
}

const SummaryCard = ({ selectedSummary }: SummaryCardProps) => {
  const { data: todayReflection } = useSuspenseTodayReflectionQuery();
  const { data: todayQuestion } = useTodayQuestionSuspenseQuery();
  const hasSelectedDate = selectedSummary !== null;
  const selectedReflectionId = selectedSummary?.reflectionId ?? null;
  const hasSelectedReflection = selectedReflectionId !== null;
  const hasTodayReflectionContent = todayReflection?.content != null;

  const href = hasSelectedDate
    ? hasSelectedReflection
      ? `/reflection/${selectedReflectionId}`
      : null
    : hasTodayReflectionContent
      ? `/reflection/${todayReflection.id}`
      : '/reflection';

  const questionText = hasSelectedDate
    ? (selectedSummary.questionText ?? '회고를 기록하지 않았어요')
    : (todayQuestion.content ?? '오늘의 질문이 없습니다.');
  const reflectionText = hasSelectedDate
    ? (selectedSummary.reflectionText ??
      '다른 날짜를 선택해 회고를 확인해 보세요.')
    : (todayReflection?.content ?? '아직 답변하지 않았어요!');

  return (
    <Card className="rounded-2xl bg-g-500 p-5">
      {href ? (
        <Link
          href={href}
          className="block w-full"
          aria-label="회고 상세로 이동"
        >
          <QuestionRow text={questionText} />
        </Link>
      ) : (
        <QuestionRow text={questionText} />
      )}
      <p className="pt-4 line-clamp-2 font-body-s text-g-80">
        {reflectionText}
      </p>
    </Card>
  );
};

export default SummaryCard;
