import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';

import { userKeys } from '../constants/queryKeys';
import { USER_ENDPOINTS } from '../constants/url';

const userDetailSchema = z.object({
  id: z.number(),
  email: z.email(),
  name: z.string(),
  streakDays: z.number(),
  isOnboarded: z.boolean(),
  createdAt: z.string(),
});

type UserDetailResponse = z.infer<typeof userDetailSchema>;

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
