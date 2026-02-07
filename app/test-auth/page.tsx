import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

const TestAuthPage = () => {
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  const TestAuthClient = dynamic(() => import('./TestAuthClient'), {
    ssr: false,
  });

  return <TestAuthClient />;
};

export default TestAuthPage;
