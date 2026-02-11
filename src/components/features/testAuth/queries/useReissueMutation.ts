import { useMutation } from '@tanstack/react-query';

import { post } from '@/src/lib/api';

import { testAuthKeys } from '../constants/queryKeys';
import { TEST_AUTH_ENDPOINTS } from '../constants/url';
import { ensureDevelopment } from '../util/guards';

const reissue = async (): Promise<void> => {
  ensureDevelopment();
  return post<never, void>(TEST_AUTH_ENDPOINTS.reissue);
};

export const useReissueMutation = () =>
  useMutation({
    mutationKey: testAuthKeys.reissue(),
    mutationFn: reissue,
  });
