import ZtpiHeader from '@/src/components/features/test/ZtpiHeader/ZtpiHeader';
import ZtpiTest from '@/src/components/features/test/ZtpiTest/ZtpiTest';

const ZtpiTestPage = () => {
  return (
    <div className="flex flex-col h-dvh">
      <ZtpiHeader />
      <div className="flex-1 overflow-y-auto pb-8">
        <ZtpiTest />
      </div>
    </div>
  );
};

export default ZtpiTestPage;
