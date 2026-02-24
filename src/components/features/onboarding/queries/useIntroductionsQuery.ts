import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';

import { ONBOARDING_QUERY_KEYS } from '../constants/queryKeys';
import { ONBOARDING_ENDPOINTS } from '../constants/url';

const IntroductionSchema = z.object({
  id: z.number(),
  version: z.number(),
  sequence: z.number(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  createdAt: z.coerce.date(),
});

const ResponseSchema = z.array(IntroductionSchema);

export type IntroductionType = z.infer<typeof IntroductionSchema>;
type ResponseType = z.infer<typeof ResponseSchema>;

const ParamsSchema = z.object({
  version: z.number(),
});

type ParamsType = z.infer<typeof ParamsSchema>;

export const introductions = ({ version }: ParamsType) =>
  get<ResponseType, ParamsType>(ONBOARDING_ENDPOINTS.introductions, {
    params: { version },
    paramsSchema: ParamsSchema,
    responseSchema: ResponseSchema,
  });

export const useIntroductionsQuery = ({ version }: ParamsType) => {
  return useQuery({
    queryKey: ONBOARDING_QUERY_KEYS.introductions(version),
    queryFn: () => introductions({ version }),
    staleTime: 60 * 1000 * 5,
  });
};
