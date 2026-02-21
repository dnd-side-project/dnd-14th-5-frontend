import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';

import { TEST_QUERY_KEYS } from '../constants/queryKey';
import { TEST_ENDPOINTS } from '../constants/url';

const ResponseSchema = z.array(
  z.object({
    id: z.number(),
    testId: z.number(),
    status: z.string(),
    createdAt: z.coerce.date(),
  }),
);

type ResponseType = z.infer<typeof ResponseSchema>;

const testRecords = () =>
  get<ResponseType>(TEST_ENDPOINTS['myRecords'], {
    responseSchema: ResponseSchema,
  });

export const useTestRecordsQuery = () => {
  return useQuery({
    queryKey: TEST_QUERY_KEYS['records'](),
    queryFn: testRecords,
    staleTime: 60 * 1000 * 5,
  });
};
