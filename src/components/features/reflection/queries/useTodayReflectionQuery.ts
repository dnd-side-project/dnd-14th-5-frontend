import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';

import { reflectionKeys } from '../constants/queryKeys';
import { REFLECTION_ENDPOINTS } from '../constants/url';

const todayReflectionSchema = z.object({
  id: z.number(),
  question: z.object({
    id: z.number(),
    sequence: z.number(),
    category: z.enum([
      'PAST_NEGATIVE',
      'PAST_POSITIVE',
      'PRESENT_HEDONISTIC',
      'PRESENT_FATALISTIC',
      'FUTURE',
    ]),
    content: z.string(),
    createdBy: z.string(),
    createdAt: z.string(),
  }),
  content: z.string(),
  feedback: z.object({
    id: z.number(),
    reflectionId: z.number(),
    score: z.number(),
    content: z.string().nullable(),
    status: z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED']),
    createdAt: z.string(),
  }),
  reflectedAt: z.string(),
});

export type GetTodayReflectionResponse = z.infer<typeof todayReflectionSchema>;

const getTodayReflection = async (): Promise<GetTodayReflectionResponse> => {
  return get<GetTodayReflectionResponse>(REFLECTION_ENDPOINTS.todayReflection, {
    responseSchema: todayReflectionSchema,
  });
};

export const useTodayReflectionQuery = () =>
  useQuery({
    queryKey: reflectionKeys.todayReflection(),
    queryFn: getTodayReflection,
  });
