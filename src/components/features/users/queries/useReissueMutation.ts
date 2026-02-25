import { useMutation } from '@tanstack/react-query';

import { post } from '@/src/lib/api';

import { userKeys } from '../constants/queryKeys';
import { USER_ENDPOINTS } from '../constants/url';

const reissue = async (): Promise<void> => {
  return post<never, void>(USER_ENDPOINTS.reissue);
};

export const useReissueMutation = () =>
  useMutation({
    mutationKey: userKeys.reissue(),
    mutationFn: reissue,
  });
