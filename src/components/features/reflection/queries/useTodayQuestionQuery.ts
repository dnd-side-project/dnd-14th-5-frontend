import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';
import type { ApiRequestConfig } from '@/src/lib/api/schema';

import { reflectionKeys } from '../constants/queryKeys';
import { REFLECTION_ENDPOINTS } from '../constants/url';

export const todayQuestionSchema = z.object({
  id: z.number(),
  category: z.string(),
  content: z.string(),
  sequence: z.number(),
  createdBy: z.string(),
  createdAt: z.string(),
});

export type TodayQuestionResponse = z.infer<typeof todayQuestionSchema>;

export const getTodayQuestion = async (
  config?: ApiRequestConfig<never, never, TodayQuestionResponse>,
) => {
  return get<TodayQuestionResponse>(REFLECTION_ENDPOINTS.todayQuestion, {
    ...config,
    responseSchema: todayQuestionSchema,
  });
};

export const useTodayQuestionQuery = () =>
  useQuery({
    queryKey: reflectionKeys.todayQuestion(),
    queryFn: () => getTodayQuestion(),
  });

export const useTodayQuestionSuspenseQuery = () =>
  useSuspenseQuery({
    queryKey: reflectionKeys.todayQuestion(),
    queryFn: () => getTodayQuestion(),
  });
