'use client';

import { useRouter } from 'next/navigation';

import Button from '@/src/components/ui/Button/Button';

interface ViewResultButtonProps {
  resultId: string;
}

const ViewResultButton = ({ resultId }: ViewResultButtonProps) => {
  const router = useRouter();

  const handleViewResultClick = () => {
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
