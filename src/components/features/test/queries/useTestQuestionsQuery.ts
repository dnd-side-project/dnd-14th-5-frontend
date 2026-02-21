import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';

import { TEST_QUERY_KEYS } from '../constants/queryKey';
import { TEST_ENDPOINTS } from '../constants/url';

const ResponseSchema = z.array(
  z.object({
    id: z.number(),
    testId: z.number(),
    sequence: z.number(),
    content: z.string(),
    isReversed: z.boolean(),
    category: z.string(),
    createdAt: z.coerce.date(),
  }),
);

type ResponseType = z.infer<typeof ResponseSchema>;

interface PathType {
  testId: number;
}

const testQuestions = ({ testId }: PathType) =>
  get<ResponseType>(TEST_ENDPOINTS['questions'](testId), {
    responseSchema: ResponseSchema,
  });

export const useTestQuestionsQuery = ({ testId }: PathType) => {
  return useQuery({
    queryKey: TEST_QUERY_KEYS['questions'](testId),
    queryFn: () => testQuestions({ testId }),
    staleTime: 60 * 1000 * 5,
  });
};
