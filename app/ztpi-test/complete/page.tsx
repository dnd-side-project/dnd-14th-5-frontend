import Image from 'next/image';

import ViewResultButton from '@/src/components/features/test/ViewResultButton/ViewResultButton';

interface TestCompletePageProps {
  searchParams: Promise<{ [key: string]: string }>;
}

const TestCompletePage = async ({ searchParams }: TestCompletePageProps) => {
  const { resultId } = await searchParams;

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div className="flex flex-1 flex-col justify-center items-center space-y-15 mb-50">
        <div className="text-center space-y-2">
          <h2 className="text-heading-h2 text-g-0">테스트 완료!</h2>
          <p className="text-body-m text-g-60">나의 시간관은 무엇일까요?</p>
        </div>
        <Image
          src="/character/success-test.gif"
          alt="character gif"
          width={200}
          height={200}
          unoptimized
        />
      </div>

      <ViewResultButton resultId={resultId} />
    </div>
  );
};

export default TestCompletePage;
