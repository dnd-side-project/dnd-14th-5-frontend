'use client';

import { useState } from 'react';

import Completed from '@/src/components/features/test/Completed/Completed';
import InProgress from '@/src/components/features/test/InProgress/InProgress';
import Intro from '@/src/components/features/test/Intro/Intro';
import Result from '@/src/components/features/test/Result/Result';

const TestFlow = () => {
  const [step, setStep] = useState('progress');

  switch (step) {
    case 'intro':
      return <Intro />;
    case 'progress':
      return <InProgress />;
    case 'completed':
      return <Completed />;
    case 'result':
      return <Result />;
  }
};

export default TestFlow;
