import { useMutation } from '@tanstack/react-query';

import { post } from '@/src/lib/api';

import { reflectionKeys } from '../constants/queryKeys';
import { REFLECTION_ENDPOINTS } from '../constants/url';

interface SubmitReflectionRequestType {
  content: string;
}

interface SubmitReflectionResponseType {
  id: number;
}

const submitReflection = async (payload: SubmitReflectionRequestType) => {
  return post<SubmitReflectionRequestType, SubmitReflectionResponseType>(
    REFLECTION_ENDPOINTS.submitReflection,
    payload,
  );
};

export const useSubmitReflectionMutation = () =>
  useMutation({
    mutationKey: reflectionKeys.submitReflection(),
    mutationFn: submitReflection,
  });
