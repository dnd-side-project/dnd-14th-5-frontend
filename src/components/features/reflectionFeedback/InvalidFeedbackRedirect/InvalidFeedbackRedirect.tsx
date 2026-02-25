'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { useToast } from '@/src/hooks/useToast';

const InvalidFeedbackRedirect = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const hasHandledRef = useRef(false);

  useEffect(() => {
    if (hasHandledRef.current) {
      return;
    }

    hasHandledRef.current = true;
    showToast({ message: '잘못된 페이지 주소입니다.' });
    router.replace('/');
  }, [router, showToast]);

  return null;
};

export default InvalidFeedbackRedirect;
