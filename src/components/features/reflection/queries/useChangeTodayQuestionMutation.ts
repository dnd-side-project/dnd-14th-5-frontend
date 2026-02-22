import { useMutation } from '@tanstack/react-query';

import { post } from '@/src/lib/api';

import { reflectionKeys } from '../constants/queryKeys';
import { REFLECTION_ENDPOINTS } from '../constants/url';
import {
  type TodayQuestionResponse,
  todayQuestionSchema,
} from './useTodayQuestionQuery';

const changeTodayQuestion = async () => {
  return post<never, TodayQuestionResponse>(
    REFLECTION_ENDPOINTS.changeTodayQuestion,
    undefined,
    {
      responseSchema: todayQuestionSchema,
    },
  );
};

interface UseChangeTodayQuestionMutationOptions {
  onSuccess?: (data: TodayQuestionResponse) => void;
  onError?: () => void;
}

export const useChangeTodayQuestionMutation = (
  options?: UseChangeTodayQuestionMutationOptions,
) =>
  useMutation({
    mutationKey: reflectionKeys.changeTodayQuestion(),
    mutationFn: changeTodayQuestion,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
