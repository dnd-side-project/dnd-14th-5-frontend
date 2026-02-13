'use client';

import { useRouter } from 'next/navigation';

import Button from '@/src/components/ui/Button/Button';

const CompleteButton = () => {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/');
  };

  return <Button label="완료" onClick={handleComplete} />;
};

export default CompleteButton;
