import { useMutation } from '@tanstack/react-query';

import { del } from '@/src/lib/api';

import { profileKeys } from '../constants/queryKeys';
import { PROFILE_ENDPOINTS } from '../constants/url';

const withdraw = async (): Promise<void> => {
  return del<never, void>(PROFILE_ENDPOINTS.withdraw);
};

export const useWithdrawMutation = () =>
  useMutation({
    mutationKey: profileKeys.withdraw(),
    mutationFn: withdraw,
  });
