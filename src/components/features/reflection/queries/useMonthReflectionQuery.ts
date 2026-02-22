import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';

import { reflectionKeys } from '../constants/queryKeys';
import { REFLECTION_ENDPOINTS } from '../constants/url';

const monthReflectionRequestSchema = z.object({
  month: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/), // 2026-02 형태
});

const monthReflectionItemSchema = z.object({
  id: z.number(),
  question: z.object({
    id: z.number(),
    sequence: z.number(),
    category: z.string(),
    content: z.string(),
    createdBy: z.string(),
    createdAt: z.string(),
  }),
  content: z.string(),
  reflectedAt: z.string(),
});

const monthReflectionResponseSchema = z.array(monthReflectionItemSchema);

export type GetMonthReflectionRequest = z.infer<
  typeof monthReflectionRequestSchema
>;
type YearMonth = GetMonthReflectionRequest['month'];

export type GetMonthReflectionResponse = z.infer<
  typeof monthReflectionResponseSchema
>;

const getMonthReflection = async (
  month: YearMonth,
): Promise<GetMonthReflectionResponse> => {
  return get<GetMonthReflectionResponse, GetMonthReflectionRequest>(
    REFLECTION_ENDPOINTS.monthReflection,
    {
      params: { month },
      paramsSchema: monthReflectionRequestSchema,
      responseSchema: monthReflectionResponseSchema,
    },
  );
};

export const useMonthReflectionQuery = ({ month }: GetMonthReflectionRequest) =>
  useQuery({
    queryKey: reflectionKeys.monthReflection(month),
    queryFn: () => getMonthReflection(month),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

export const useSuspenseMonthReflectionQuery = ({
  month,
}: GetMonthReflectionRequest) =>
  useSuspenseQuery({
    queryKey: reflectionKeys.monthReflection(month),
    queryFn: () => getMonthReflection(month),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
