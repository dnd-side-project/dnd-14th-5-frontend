import Image from 'next/image';

import PageHeader from '@/components/layout/PageHeader/PageHeader';

const RetrospectivePage = () => {
  return (
    <div className="bg-white min-h-screen px-6">
      <PageHeader
        title="회고 작성"
        leftIcon={
          <Image
            src="/icons/chevron-left.svg"
            alt="back"
            width={24}
            height={24}
          />
        }
      />
    </div>
  );
};

export default RetrospectivePage;
