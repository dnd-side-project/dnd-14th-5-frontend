'use client';

import { useRouter } from 'next/navigation';

import Button from '@/src/components/ui/Button/Button';
import Icon from '@/src/components/ui/Icon/Icon';

import { useTestRecordQuery } from '../queries/useTestRecordQuery';

interface ResultProps {
  testRecordId: number;
}

const Result = ({ testRecordId }: ResultProps) => {
  const router = useRouter();
  const { data, isPending, isError } = useTestRecordQuery({ testRecordId });

  const goHome = () => {
    router.push('/');
  };

  if (isPending) {
    return <></>;
  }

  if (isError) {
    return <></>;
  }

  const { personality, character, description } = data.result.closestCategory;

  return (
    <>
      <section className="space-y-3">
        <div className="text-label-n text-primary">나의 시간관</div>
        <h2 className="text-heading-h2 text-g-0">
          당신의 캐릭터는
          <br />
          {personality} {character}에요!
        </h2>
        <p className="text-body-s text-g-60 break-keep">{description}</p>
      </section>
      <section>{/* 이미지 */}</section>

      <section className="flex flex-col gap-2">
        <div className="flex justify-end items-center">
          <Icon name="glowDot" size={20} />
          <span className="text-button-s text-g-80">이상적 수치표</span>
        </div>
        <div className="bg-g-100 h-40 rounded-lg"></div>
      </section>

      <p className="text-g-60 text-body-s">
        지금 나는 어떤 시간에 가장 머물러 있을까요? 그래프를 통해 나의 시간 사용
        습관을 확인해보세요! 작은 인식이 더 좋은 균형으로 이어질 수 있어요.
      </p>

      <Button label="완료" onClick={goHome} className="h-10 text-g-900" />
    </>
  );
};

export default Result;
