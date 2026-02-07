import { useMutation } from '@tanstack/react-query';

import { post } from '@/src/lib/api';

import { ensureDevelopment } from '../util/guards';
import { TEST_AUTH_ENDPOINTS } from './constants';
import { testAuthKeys } from './keys';

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

const reissue = async (refreshToken: string): Promise<Tokens> => {
  ensureDevelopment();
  return post<{ refreshToken: string }, Tokens>(TEST_AUTH_ENDPOINTS.reissue, {
    refreshToken,
  });
};

export const useReissueMutation = () =>
  useMutation({
    mutationKey: testAuthKeys.reissue(),
    mutationFn: reissue,
  });
