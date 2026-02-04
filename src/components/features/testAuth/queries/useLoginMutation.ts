import { useMutation } from '@tanstack/react-query';

import { login } from '../apis/api';
import { testAuthKeys } from './keys';

export const useLoginMutation = () =>
  useMutation({
    mutationKey: testAuthKeys.login(),
    mutationFn: login,
  });
