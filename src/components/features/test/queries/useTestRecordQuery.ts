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

interface PathType {
  testRecordId: number;
}

const testRecord = ({ testRecordId }: PathType) =>
  get<ResponseType>(TEST_ENDPOINTS['record'](testRecordId), {
    responseSchema: ResponseSchema,
  });

export const useTestRecordQuery = ({ testRecordId }: PathType) => {
  return useQuery({
    queryKey: TEST_QUERY_KEYS['record'](testRecordId),
    queryFn: () => testRecord({ testRecordId }),
    staleTime: 60 * 1000 * 5,
  });
};
