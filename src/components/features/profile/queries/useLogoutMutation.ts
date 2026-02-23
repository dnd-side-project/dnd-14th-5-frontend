import { useMutation } from '@tanstack/react-query';

import { post } from '@/src/lib/api';

import { profileKeys } from '../constants/queryKeys';
import { PROFILE_ENDPOINTS } from '../constants/url';

const logout = async (): Promise<void> => {
  return post<never, void>(PROFILE_ENDPOINTS.logout);
};

export const useLogoutMutation = () =>
  useMutation({
    mutationKey: profileKeys.logout(),
    mutationFn: logout,
  });
