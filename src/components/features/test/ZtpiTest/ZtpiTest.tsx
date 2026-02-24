'use client';

import { useEffect } from 'react';

import ErrorState from '@/src/components/ui/ErrorState/ErrorState';
import { useToast } from '@/src/hooks/useToast';
import { isApiError } from '@/src/lib/api/error';

import { TEST_TYPES } from '../constants/testTypes';
import InProgress from '../InProgress/InProgress';
import InProgressSkeleton from '../InProgress/InProgressSkeleton';
import { useAllTestQuery } from '../queries/useAllTestQuery';
import { useStartTestMutation } from '../queries/useStartTestMutation';

interface ErrorDetailType {
  message: string;
  name: string;
}

const ZtpiTest = () => {
  const { data, isError, isPending, refetch } = useAllTestQuery();
  const { showToast } = useToast();

  const ztpiTestId = data?.find(
    (item) => item.type === TEST_TYPES['ZTPI_15'],
  )?.id;

  const {
    data: testRecordId,
    mutate,
    isError: isFailedStart,
    isPending: isStartPending,
    error,
  } = useStartTestMutation();

  useEffect(() => {
    if (ztpiTestId !== undefined) {
      mutate({ testId: ztpiTestId });
    }
  }, [ztpiTestId, mutate]);

  const isExistTestRecord = isApiError(error) && error.status === 409;

  useEffect(() => {
    if (isFailedStart && isExistTestRecord) {
      showToast({ message: '임시 저장된 테스트 기록을 불러왔어요.' });
    }
  }, [isFailedStart, isExistTestRecord, showToast]);

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

  // TODO: 삭제될 함수 (API 응답에서 실제 ID를 필드로 받을 예정)
  function extractTestRecordId(message: string) {
    const match = message.match(/testRecordId:\s*(\d+)/);
    return Number(match?.[1]) ?? 1;
  }

  if (isFailedStart) {
    if (isExistTestRecord) {
      return (
        <InProgress
          testId={ztpiTestId}
          // TODO: API 응답에서 실제 ID를 필드로 받을 예정
          testRecordId={extractTestRecordId(
            (error.detail as ErrorDetailType).message,
          )}
        />
      );
    }
    return <ErrorState title="테스트 시작을 실패했어요." className="py-15" />;
  }

  if (testRecordId === undefined) {
    return (
      <ErrorState
        title="테스트 정보를 찾을 수 없어요."
        description="잠시 후 다시 시도해주세요."
        onRetry={refetch}
        className="py-15"
      />
    );
  }

  return <InProgress testId={ztpiTestId} testRecordId={testRecordId.id} />;
};

export default ZtpiTest;
