import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { post } from '@/src/lib/api';

import { TEST_QUERY_KEYS } from '../constants/queryKey';
import { TEST_ENDPOINTS } from '../constants/url';

const DataSchema = z.object({
  questionId: z.number(),
  score: z.number(),
});

type DataType = z.infer<typeof DataSchema>;

interface PathType {
  testRecordId: number;
}

const postQuestionResponse = ({
  testRecordId,
  questionId,
  score,
}: PathType & DataType) =>
  post<DataType, never>(
    TEST_ENDPOINTS['responses'](testRecordId),
    { questionId, score },
    {
      dataSchema: DataSchema,
    },
  );

export const usePostQuestionResponseMutation = ({ testRecordId }: PathType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: TEST_QUERY_KEYS['registerQuestionResponse'](testRecordId),
    mutationFn: ({ questionId, score }: DataType) =>
      postQuestionResponse({ questionId, score, testRecordId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TEST_QUERY_KEYS['responses'](testRecordId),
      });
    },
  });
};
