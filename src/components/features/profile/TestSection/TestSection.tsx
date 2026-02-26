'use client';

import Card from '@/src/components/ui/Card/Card';

import { useTestSectionActions } from '../hooks/useTestSectionActions';
import { MenuRow } from '../MenuRow/MenuRow';

const TestSection = () => {
  const { handleRetakeTest, handleViewLatestResult } = useTestSectionActions();

  return (
    <Card className="flex flex-col gap-4 bg-g-400 ">
      <p className="text-body-s font-bold">시간관 캐릭터 테스트</p>
      <MenuRow label="테스트 다시하기" onClick={handleRetakeTest} />
      <MenuRow label="지난 테스트결과 보기" onClick={handleViewLatestResult} />
    </Card>
  );
};

export default TestSection;
