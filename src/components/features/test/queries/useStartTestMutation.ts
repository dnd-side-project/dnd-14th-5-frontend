import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { post } from '@/src/lib/api';

import { TEST_QUERY_KEYS } from '../constants/queryKey';
import { TEST_ENDPOINTS } from '../constants/url';

const DataSchema = z.object({
  testId: z.number(),
});

const ResponseSchema = z.object({
  id: z.number(),
  isExisting: z.boolean(),
});

type DataType = z.infer<typeof DataSchema>;
type ResponseType = z.infer<typeof ResponseSchema>;

const startTest = ({ testId }: DataType) =>
  post<DataType, ResponseType>(
    TEST_ENDPOINTS['records'],
    { testId },
    {
      dataSchema: DataSchema,
      responseSchema: ResponseSchema,
    },
  );

export const useStartTestMutation = () => {
  return useMutation({
    mutationKey: TEST_QUERY_KEYS['start'](),
    mutationFn: ({ testId }: DataType) => startTest({ testId }),
  });
};
