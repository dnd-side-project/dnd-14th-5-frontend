import { notFound } from 'next/navigation';

import { isTestAuthEnabled } from '@/src/components/features/testAuth/util/guards';

const TestAuthPage = async () => {
  // Original code (복구용)
  // if (process.env.NODE_ENV !== 'development') {
  if (!isTestAuthEnabled()) {
    notFound();
  }

  const TestAuthClient = (await import('./TestAuthClient')).default;

  return <TestAuthClient />;
};

export default TestAuthPage;
