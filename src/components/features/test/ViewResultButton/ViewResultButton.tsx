'use client';

import { useRouter } from 'next/navigation';
import { use } from 'react';

import Button from '@/src/components/ui/Button/Button';

interface ViewResultButtonProps {
  searchParams: Promise<{ [key: string]: string }>;
}

const ViewResultButton = ({ searchParams }: ViewResultButtonProps) => {
  const router = useRouter();
  const resultId = use(searchParams).resultId;

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
