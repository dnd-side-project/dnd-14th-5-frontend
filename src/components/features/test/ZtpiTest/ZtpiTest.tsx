'use client';

import { useEffect } from 'react';

import ErrorState from '@/src/components/ui/ErrorState/ErrorState';
import { useToast } from '@/src/hooks/useToast';

import { TEST_TYPES } from '../constants/testTypes';
import InProgress from '../InProgress/InProgress';
import InProgressSkeleton from '../InProgress/InProgressSkeleton';
import { useAllTestQuery } from '../queries/useAllTestQuery';
import { useStartTestMutation } from '../queries/useStartTestMutation';

const ZtpiTest = () => {
  const { data, isError, isPending, refetch } = useAllTestQuery();
  const { showToast } = useToast();

  const ztpiTestId = data?.find(
    (item) => item.type === TEST_TYPES['ZTPI_15'],
  )?.id;

  const {
    data: testRecord,
    mutate,
    isError: isFailedStart,
    isPending: isStartPending,
  } = useStartTestMutation();

  useEffect(() => {
    if (ztpiTestId !== undefined) {
      mutate({ testId: ztpiTestId });
    }
  }, [ztpiTestId, mutate]);

  useEffect(() => {
    if (testRecord?.isExisting) {
      showToast({ message: '임시 저장된 테스트 기록을 불러왔어요.' });
    }
  }, [testRecord?.isExisting, showToast]);

  if (isPending || isStartPending) {
    return <InProgressSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        title="테스트를 불러오지 못했어요."
        description="잠시 후 다시 시도해주세요."
        onRetry={refetch}
        className="py-15"
      />
    );
  }

  if (ztpiTestId === undefined) {
    return (
      <ErrorState
        title="테스트 정보를 찾을 수 없어요."
        description="잠시 후 다시 시도해주세요."
        onRetry={refetch}
        className="py-15"
      />
    );
  }

  if (isFailedStart) {
    return <ErrorState title="테스트 시작을 실패했어요." className="py-15" />;
  }

  if (testRecord === undefined) {
    return (
      <ErrorState
        title="테스트 정보를 찾을 수 없어요."
        description="잠시 후 다시 시도해주세요."
        onRetry={refetch}
        className="py-15"
      />
    );
  }

  return <InProgress testId={ztpiTestId} testRecordId={testRecord.id} />;
};

export default ZtpiTest;
