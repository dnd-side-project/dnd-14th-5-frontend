import { useMutation } from '@tanstack/react-query';

import { post } from '@/src/lib/api';

import { ensureDevelopment } from '../util/guards';
import { TEST_AUTH_ENDPOINTS } from './constants';
import { testAuthKeys } from './keys';

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
