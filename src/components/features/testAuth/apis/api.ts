import { post } from '@/src/lib/api';

import { TEST_AUTH_ENDPOINTS } from '../queries/constants';
import { ensureDevelopment } from '../util/guards';

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export const login = async (email: string): Promise<Tokens> => {
  ensureDevelopment();
  return post<{ email: string }, Tokens>(TEST_AUTH_ENDPOINTS.login, { email });
};

export const reissue = async (refreshToken: string): Promise<Tokens> => {
  ensureDevelopment();
  return post<{ refreshToken: string }, Tokens>(TEST_AUTH_ENDPOINTS.reissue, {
    refreshToken,
  });
};
