import { useMutation } from '@tanstack/react-query';

import { reissue } from '../apis/api';
import { testAuthKeys } from './keys';

export const useReissueMutation = () =>
  useMutation({
    mutationKey: testAuthKeys.reissue(),
    mutationFn: reissue,
  });
