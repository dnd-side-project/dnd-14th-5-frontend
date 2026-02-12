'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { TEST_TYPES } from '@/src/components/features/test/constants/testTypes';
import InProgress from '@/src/components/features/test/InProgress/InProgress';
import { useAllTestQuery } from '@/src/components/features/test/queries/useAllTestQuery';
import { useStartTestMutation } from '@/src/components/features/test/queries/useStartTestMutation';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import Icon from '@/src/components/ui/Icon/Icon';

const ZtpiTestPage = () => {
  const router = useRouter();

  return (
    <main>
      <PageHeader
        title="ZTPI 테스트"
        onLeftClick={() => router.back()}
        leftIcon={<Icon name="chevronLeft" size={25} />}
      />
      <ZtpiTest />
    </main>
  );
};

const ZtpiTest = () => {
  const { data, isError, isLoading, isSuccess } = useAllTestQuery();

  const ztpiTestId = data?.find(
    (item) => item.type === TEST_TYPES['ZTPI_15'],
  )?.id;

  const {
    data: testRecordId,
    mutate,
    isError: isFailedStart,
    isPending,
  } = useStartTestMutation();

  // TODO: 온보딩 페이지에서 테스트로 넘어갈 때 mutate되도록 수정 필요
  useEffect(() => {
    if (isSuccess && ztpiTestId !== undefined) {
      mutate({ testId: ztpiTestId });
    }
  }, [ztpiTestId, isSuccess, mutate]);

  if (
    isLoading ||
    isPending ||
    ztpiTestId === undefined ||
    testRecordId === undefined
  ) {
    // TODO: 임시 loader
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-dotted mr-3" />
        <p className="text-g-20">로딩 중...</p>
      </div>
    );
  }

  if (isError || (isSuccess && !data)) {
    return (
      // TODO: ErrorState 컴포넌트로 수정
      <div className="flex justify-center items-center py-20">
        테스트를 불러오지 못했습니다.
      </div>
    );
  }

  if (isFailedStart || (isSuccess && !testRecordId)) {
    return (
      // TODO: ErrorState 컴포넌트로 수정
      <div className="flex justify-center items-center py-20">
        테스트 시작을 실패했습니다.
      </div>
    );
  }

  return <InProgress testId={ztpiTestId} testRecordId={testRecordId.id} />;
};

export default ZtpiTestPage;
