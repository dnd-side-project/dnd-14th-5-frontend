import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';

import { reflectionKeys } from '../constants/queryKeys';
import { REFLECTION_ENDPOINTS } from '../constants/url';

const todayQuestionSchema = z.object({
  id: z.number(),
  category: z.string(),
  content: z.string(),
  sequence: z.number(),
  createdBy: z.string(),
  createdAt: z.string(),
});

type GetTodayQuestionResponse = z.infer<typeof todayQuestionSchema>;

const getTodayQuestion = async (): Promise<GetTodayQuestionResponse> => {
  return get<GetTodayQuestionResponse>(REFLECTION_ENDPOINTS.todayQuestion, {
    responseSchema: todayQuestionSchema,
  });
};

export const useTodayQuestionQuery = () =>
  useQuery({
    queryKey: reflectionKeys.todayQuestion(),
    queryFn: getTodayQuestion,
  });
