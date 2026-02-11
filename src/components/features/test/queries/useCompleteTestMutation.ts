import { useMutation } from '@tanstack/react-query';

import { patch } from '@/src/lib/api';

import { TEST_QUERY_KEYS } from '../constants/queryKey';
import { TEST_ENDPOINTS } from '../constants/url';

interface PathType {
  testRecordId: number;
}

const completeTest = ({ testRecordId }: PathType) =>
  patch<never, never>(TEST_ENDPOINTS['complete'](testRecordId), undefined);

export const useCompleteTestMutation = ({ testRecordId }: PathType) => {
  return useMutation({
    mutationKey: TEST_QUERY_KEYS['response'](testRecordId),
    mutationFn: () => completeTest({ testRecordId }),
  });
};
