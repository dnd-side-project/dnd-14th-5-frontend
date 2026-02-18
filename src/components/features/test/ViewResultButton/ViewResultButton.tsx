'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import Button from '@/src/components/ui/Button/Button';

const ViewResultButton = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleViewResultClick = () => {
    const resultId = searchParams.get('resultId');
    if (!resultId) return;
    router.push(`/ztpi/${resultId}`);
  };

  return (
    <Button
      label="결과 확인하기"
      className="text-g-900 h-10"
      onClick={handleViewResultClick}
    />
  );
};

export default ViewResultButton;
