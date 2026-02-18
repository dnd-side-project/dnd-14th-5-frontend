import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { patch } from '@/src/lib/api';

import { TEST_QUERY_KEYS } from '../constants/queryKey';
import { TEST_ENDPOINTS } from '../constants/url';

interface PathType {
  testRecordId: number;
}

const ClosestCategorySchema = z.object({
  name: z.string(),
  character: z.string(),
  personality: z.string(),
  description: z.string(),
});

const ScoreSchema = z.object({
  category: z.string(),
  score: z.number(),
  idealScore: z.number(),
});

const ResponseSchema = z.object({
  id: z.number(),
  testId: z.number(),
  status: z.string(),
  progress: z.number().nullable(),
  createdAt: z.coerce.date(),
  result: z.object({
    closestCategory: ClosestCategorySchema,
    scores: z.array(ScoreSchema),
  }),
});

type ResponseType = z.infer<typeof ResponseSchema>;

const completeTest = ({ testRecordId }: PathType) =>
  patch<never, ResponseType>(
    TEST_ENDPOINTS['complete'](testRecordId),
    undefined,
    {
      responseSchema: ResponseSchema,
    },
  );

export const useCompleteTestMutation = ({ testRecordId }: PathType) => {
  return useMutation({
    mutationKey: TEST_QUERY_KEYS['complete'](testRecordId),
    mutationFn: () => completeTest({ testRecordId }),
  });
};
