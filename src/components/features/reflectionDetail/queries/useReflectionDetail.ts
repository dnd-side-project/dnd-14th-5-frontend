import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';

import { REFLECTION } from '../constants/queryKey';
import { REFLECTION_ENDPOINT } from '../constants/url';

const QuestionSchema = z.object({
  category: z.string(),
  content: z.string(),
  createdAt: z.coerce.date(),
  createdBy: z.string(),
  id: z.number(),
  sequence: z.number(),
});

const FeedbackSchema = z.object({
  content: z.string().nullable(),
  createdAt: z.coerce.date(),
  id: z.number(),
  reflectionId: z.number(),
  score: z.number(),
  status: z.string(),
});

const ResponseSchema = z.object({
  id: z.number(),
  question: QuestionSchema,
  content: z.string(),
  feedback: FeedbackSchema,
  reflectedAt: z.coerce.date(),
});

type ResponseType = z.infer<typeof ResponseSchema>;

interface PathType {
  reflectionId: number;
}

const reflectionDetail = ({ reflectionId }: PathType) =>
  get<ResponseType>(REFLECTION_ENDPOINT.reflection(reflectionId), {
    responseSchema: ResponseSchema,
  });

export const useReflectionDetail = ({ reflectionId }: PathType) =>
  useQuery({
    queryKey: REFLECTION.reflection(reflectionId),
    queryFn: () => reflectionDetail({ reflectionId }),
    staleTime: 60 * 1000 * 5,
  });
