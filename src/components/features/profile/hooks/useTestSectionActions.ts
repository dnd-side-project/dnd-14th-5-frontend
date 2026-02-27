import { useRouter } from 'next/navigation';

import { useToast } from '@/src/hooks/useToast';

import {
  type TestRecord,
  useTestRecordsQuery,
} from '../../test/queries/useTestRecordsQuery';

const toMinuteTimestamp = (createdAt: Date) => {
  const normalized = new Date(createdAt);
  normalized.setSeconds(0, 0);
  return normalized.getTime();
};

const getLatestCompletedRecord = (records: TestRecord[]) => {
  return records
    .filter((record) => record.status === 'COMPLETED')
    .reduce<TestRecord | null>((currentLatest, record) => {
      if (!currentLatest) {
        return record;
      }

      return toMinuteTimestamp(record.createdAt) >
        toMinuteTimestamp(currentLatest.createdAt)
        ? record
        : currentLatest;
    }, null);
};

export const useTestSectionActions = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { data: testRecords } = useTestRecordsQuery();

  const handleRetakeTest = () => {
    router.push('/ztpi-test');
  };

  const handleViewLatestResult = () => {
    const latestRecord = getLatestCompletedRecord(testRecords ?? []);

    if (!latestRecord) {
      showToast({ message: '지난 테스트 결과가 없어요.' });
      return;
    }

    router.push(`/ztpi/${latestRecord.id}`);
  };

  return {
    handleRetakeTest,
    handleViewLatestResult,
  };
};
