import { useMutation, useQueryClient } from '@tanstack/react-query';

import { post } from '@/src/lib/api';

import type { GroupType } from '../constants/groupType';
import { groupKeys } from '../constants/queryKey';
import { GROUP_ENDPOINT } from '../constants/url';

type ParamsType =
  | { type: Extract<GroupType, 'FRIEND'>; code: string }
  | { type: Extract<GroupType, 'CHARACTER'> };

const joinGroup = (params: ParamsType) =>
  post<never, void, ParamsType>(GROUP_ENDPOINT.joinGroup, undefined, {
    params,
  });

export const useGroupJoinQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: groupKeys.joinGroup(),
    mutationFn: (params: ParamsType) => joinGroup(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: groupKeys.list(),
      });
    },
  });
};
