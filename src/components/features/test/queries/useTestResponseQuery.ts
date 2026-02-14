import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';

import { TEST_QUERY_KEYS } from '../constants/queryKey';
import { TEST_ENDPOINTS } from '../constants/url';

const ResponseSchema = z.array(
  z.object({
    id: z.number(),
    testRecordId: z.number(),
    questionId: z.number(),
    score: z.number(),
  }),
);

type ResponseType = z.infer<typeof ResponseSchema>;

interface PathType {
  testRecordId: number;
}

const testResponse = ({ testRecordId }: PathType) =>
  get<ResponseType>(TEST_ENDPOINTS['responses'](testRecordId), {
    responseSchema: ResponseSchema,
  });

export const useTestResponsesQuery = ({ testRecordId }: PathType) => {
  return useQuery({
    queryKey: TEST_QUERY_KEYS['responses'](testRecordId),
    queryFn: () => testResponse({ testRecordId }),
  });
};
