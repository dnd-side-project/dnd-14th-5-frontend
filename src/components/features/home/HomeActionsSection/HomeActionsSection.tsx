'use client';

import { useRouter } from 'next/navigation';

import Button from '@/src/components/ui/Button/Button';

const HomeActionsSection = () => {
  const router = useRouter();

  const handleSkip = () => {
    // Todo: 건너뛰기 기능 구현 - 어떻게 할지 논의 필요
  };

  const handleAnswer = () => {
    router.push('/reflection');
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <Button label="건너뛰기" variant="secondary" onClick={handleSkip} />
      </div>
      <div className="flex-2">
        <Button label="답변하기" onClick={handleAnswer} />
      </div>
    </div>
  );
};

export default HomeActionsSection;
