'use client';

import { useState } from 'react';

import Completed from '@/src/components/features/test/Completed/Completed';
import InProgress from '@/src/components/features/test/InProgress/InProgress';
import Result from '@/src/components/features/test/Result/Result';

type Step = 'progress' | 'completed' | 'result';

const TestFlow = () => {
  const [step, setStep] = useState<Step>('progress'); // TODO: 현재 진행 중인 개발 페이지가 progress라서 임시로 초기화

  switch (step) {
    case 'progress':
      return <InProgress />;
    case 'completed':
      return <Completed />;
    case 'result':
      return <Result />;
    default:
      return null;
  }
};

export default TestFlow;
