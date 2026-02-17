import ZtpiHeader from '@/src/components/features/test/ZtpiHeader/ZtpiHeader';
import ZtpiTest from '@/src/components/features/test/ZtpiTest/ZtpiTest';

const ZtpiTestPage = () => {
  return (
    <div className="flex flex-col h-full">
      <ZtpiHeader />
      <div className="flex-1">
        <ZtpiTest />
      </div>
    </div>
  );
};

export default ZtpiTestPage;
