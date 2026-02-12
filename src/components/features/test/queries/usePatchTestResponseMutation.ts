import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { patch } from '@/src/lib/api';

import { TEST_QUERY_KEYS } from '../constants/queryKey';
import { TEST_ENDPOINTS } from '../constants/url';

const DataSchema = z.object({
  score: z.number(),
});

type DataType = z.infer<typeof DataSchema>;

interface PathType {
  testRecordId: number;
  responseId: number;
}

const patchTestResponse = ({
  testRecordId,
  responseId,
  score,
}: PathType & DataType) =>
  patch<DataType, never>(
    TEST_ENDPOINTS['response'](testRecordId, responseId),
    { score },
    {
      dataSchema: DataSchema,
    },
  );

export const usePatchTestResponseMutation = ({
  testRecordId,
}: Omit<PathType, 'responseId'>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: TEST_QUERY_KEYS['response'](testRecordId),
    mutationFn: ({
      score,
      responseId,
    }: DataType & Pick<PathType, 'responseId'>) =>
      patchTestResponse({ score, testRecordId, responseId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TEST_QUERY_KEYS['responses'](testRecordId),
      });
    },
  });
};
