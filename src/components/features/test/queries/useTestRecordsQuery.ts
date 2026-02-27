import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';

import { TEST_QUERY_KEYS } from '../constants/queryKey';
import { TEST_ENDPOINTS } from '../constants/url';

const testRecordSchema = z.object({
  id: z.number(),
  testId: z.number(),
  status: z.string(),
  createdAt: z.coerce.date(),
});

const ResponseSchema = z.array(testRecordSchema);

export type TestRecord = z.infer<typeof testRecordSchema>;
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
