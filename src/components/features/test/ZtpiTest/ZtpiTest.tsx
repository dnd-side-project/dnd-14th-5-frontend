import { useEffect } from 'react';

import { TEST_TYPES } from '../constants/testTypes';
import InProgress from '../InProgress/InProgress';
import { useAllTestQuery } from '../queries/useAllTestQuery';
import { useStartTestMutation } from '../queries/useStartTestMutation';

const ZtpiTest = () => {
  const { data, isError, isPending } = useAllTestQuery();

  const ztpiTestId = data?.find(
    (item) => item.type === TEST_TYPES['ZTPI_15'],
  )?.id;

  const {
    data: testRecordId,
    mutate,
    isError: isFailedStart,
    isPending: isStartPending,
  } = useStartTestMutation();

  // TODO: 온보딩 페이지에서 테스트로 넘어갈 때 mutate되도록 수정 필요
  useEffect(() => {
    if (data && ztpiTestId !== undefined) {
      mutate({ testId: ztpiTestId });
    }
  }, [data, ztpiTestId, mutate]);

  if (isError) {
    // TODO: ErrorState 컴포넌트로 수정
    return (
      <div className="flex justify-center items-center py-20">
        테스트를 불러오지 못했습니다.
      </div>
    );
  }

  if (isFailedStart) {
    // TODO: ErrorState 컴포넌트로 수정
    return (
      <div className="flex justify-center items-center py-20">
        테스트 시작을 실패했습니다.
      </div>
    );
  }

  if (isPending || isStartPending) {
    // TODO: 임시 loader
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-dotted mr-3" />
        <p className="text-g-20">로딩 중...</p>
      </div>
    );
  }

  if (ztpiTestId === undefined || testRecordId === undefined) {
    // TODO: ErrorState 컴포넌트로 수정
    return (
      <div className="flex justify-center items-center py-20">
        테스트 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return <InProgress testId={ztpiTestId} testRecordId={testRecordId.id} />;
};

export default ZtpiTest;
