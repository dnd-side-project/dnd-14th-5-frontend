import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';

import { userKeys } from '../constants/queryKeys';
import { USER_ENDPOINTS } from '../constants/url';

const userDetailSchema = z.object({
  id: z.number(),
  email: z.email(),
  name: z.string(),
  provider: z.string(),
  streakDays: z.number(),
  isOnboarded: z.boolean(),
  createdAt: z.string(),
});

export type UserDetailResponse = z.infer<typeof userDetailSchema>;

const getUserDetail = async (): Promise<UserDetailResponse> => {
  return get<UserDetailResponse>(USER_ENDPOINTS.detail, {
    responseSchema: userDetailSchema,
  });
};

export const useUserDetailQuery = () =>
  useQuery({
    queryKey: userKeys.detail(),
    queryFn: getUserDetail,
  });

export const useSuspenseUserDetailQuery = () =>
  useSuspenseQuery({
    queryKey: userKeys.detail(),
    queryFn: getUserDetail,
  });
