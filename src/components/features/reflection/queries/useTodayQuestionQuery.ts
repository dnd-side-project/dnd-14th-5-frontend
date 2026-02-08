import { useQuery } from '@tanstack/react-query';

import { get } from '@/src/lib/api';

import { reflectionKeys } from '../constants/queryKeys';
import { REFLECTION_ENDPOINTS } from '../constants/url';

type GetTodayQuestionResponse = {
  id: number;
  category: string;
  content: string;
  sequence: number;
  createdBy: string;
  createdAt: string;
};

const getTodayQuestion = async (): Promise<GetTodayQuestionResponse> => {
  return get<GetTodayQuestionResponse>(REFLECTION_ENDPOINTS.todayQuestion);
};

export const useTodayQuestionQuery = () =>
  useQuery({
    queryKey: reflectionKeys.todayQuestion(),
    queryFn: getTodayQuestion,
  });
