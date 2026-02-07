import { notFound } from 'next/navigation';

const TestAuthPage = async () => {
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  const TestAuthClient = (await import('./TestAuthClient')).default;

  return <TestAuthClient />;
};

export default TestAuthPage;
