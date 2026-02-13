import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';

import { TEST_QUERY_KEYS } from '../constants/queryKey';
import { TEST_ENDPOINTS } from '../constants/url';

const ResponseSchema = z.array(
  z.object({
    id: z.number(),
    type: z.string(),
    name: z.string(),
    description: z.string(),
    createdAt: z.coerce.date(),
  }),
);

type ResponseType = z.infer<typeof ResponseSchema>;

const allTest = () =>
  get<ResponseType>(TEST_ENDPOINTS['tests'], {
    responseSchema: ResponseSchema,
  });

export const useAllTestQuery = () =>
  useQuery({
    queryKey: TEST_QUERY_KEYS['tests'],
    queryFn: allTest,
    staleTime: 60 * 1000 * 5,
  });
