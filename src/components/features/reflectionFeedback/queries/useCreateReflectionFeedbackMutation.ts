import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { post } from '@/src/lib/api';

import { reflectionFeedbackKeys } from '../constants/queryKeys';
import { REFLECTION_FEEDBACK_ENDPOINTS } from '../constants/url';

interface CreateReflectionFeedbackParams {
  reflectionId: number;
}

const createReflectionFeedbackResponseSchema = z.object({
  id: z.number(),
  reflectionId: z.number(),
  content: z.string().nullable(),
  status: z.string(),
  score: z.number(),
  createdAt: z.string(),
  failureReason: z.string().optional(),
});

type CreateReflectionFeedbackResponse = z.infer<
  typeof createReflectionFeedbackResponseSchema
>;

const createReflectionFeedback = async (
  params: CreateReflectionFeedbackParams,
): Promise<CreateReflectionFeedbackResponse> => {
  return post<never, CreateReflectionFeedbackResponse>(
    REFLECTION_FEEDBACK_ENDPOINTS.createFeedback(params.reflectionId),
    undefined,
    {
      responseSchema: createReflectionFeedbackResponseSchema,
    },
  );
};

export const useCreateReflectionFeedbackMutation = (reflectionId: number) =>
  useMutation({
    mutationKey: reflectionFeedbackKeys.create(reflectionId),
    mutationFn: () => createReflectionFeedback({ reflectionId }),
  });
