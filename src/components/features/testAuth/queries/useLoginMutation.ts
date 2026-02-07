import { useMutation } from '@tanstack/react-query';

import { post } from '@/src/lib/api';

import { testAuthKeys } from '../constants/queryKeys';
import { TEST_AUTH_ENDPOINTS } from '../constants/url';
import { ensureDevelopment } from '../util/guards';

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

const login = async (email: string): Promise<Tokens> => {
  ensureDevelopment();
  return post<{ email: string }, Tokens>(TEST_AUTH_ENDPOINTS.login, { email });
};

export const useLoginMutation = () =>
  useMutation({
    mutationKey: testAuthKeys.login(),
    mutationFn: login,
  });
