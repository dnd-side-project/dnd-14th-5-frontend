import { apiClient } from '@/src/lib/api/client';

import { TEST_AUTH_ENDPOINTS } from '../queries/constants';
import { ensureDevelopment } from '../util/guards';

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export const login = async (email: string): Promise<Tokens> => {
  ensureDevelopment();
  const { data } = await apiClient.post<Tokens>(TEST_AUTH_ENDPOINTS.login, {
    email,
  });
  return data;
};

export const reissue = async (refreshToken: string): Promise<Tokens> => {
  ensureDevelopment();
  const { data } = await apiClient.post<Tokens>(TEST_AUTH_ENDPOINTS.reissue, {
    refreshToken,
  });
  return data;
};
