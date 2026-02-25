import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { post } from '@/src/lib/api';

import { reflectionFeedbackKeys } from '../constants/queryKeys';
import { REFLECTION_FEEDBACK_ENDPOINTS } from '../constants/url';

export interface CreateReflectionFeedbackParams {
  reflectionId: number;
}

const createReflectionFeedbackResponseSchema = z.object({
  id: z.number(),
  reflectionId: z.number(),
  content: z.string().nullable(),
  status: z.string(),
  score: z.number(),
  createdAt: z.string(),
  failureReason: z.string().nullish(),
});

type CreateReflectionFeedbackResponse = z.infer<
  typeof createReflectionFeedbackResponseSchema
>;

const createReflectionFeedback = async (
  params: CreateReflectionFeedbackParams,
) => {
  return post<never, CreateReflectionFeedbackResponse>(
    REFLECTION_FEEDBACK_ENDPOINTS.createFeedback(params.reflectionId),
    undefined,
    {
      responseSchema: createReflectionFeedbackResponseSchema,
    },
  );
};

export const useCreateReflectionFeedbackMutation = () =>
  useMutation({
    mutationKey: reflectionFeedbackKeys.create(),
    mutationFn: createReflectionFeedback,
  });
