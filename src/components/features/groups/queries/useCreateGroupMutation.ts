import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { post } from '@/src/lib/api';

import { groupTypeSchema } from '../constants/groupType';
import { groupKeys } from '../constants/queryKey';
import { GROUP_ENDPOINT } from '../constants/url';

const createGroupRequestSchema = z.object({
  name: z.string(),
  type: groupTypeSchema,
  image: z.string().nullable().optional(),
});

const createGroupResponseSchema = z.object({
  id: z.number(),
  code: z.string(),
});

type CreateGroupRequest = z.infer<typeof createGroupRequestSchema>;
export type CreateGroupResponse = z.infer<typeof createGroupResponseSchema>;

const createGroup = (request: CreateGroupRequest) =>
  post<CreateGroupRequest, CreateGroupResponse>(
    GROUP_ENDPOINT.groups,
    request,
    {
      dataSchema: createGroupRequestSchema,
      responseSchema: createGroupResponseSchema,
    },
  );

export const useCreateGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: groupKeys.create(),
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.list() });
    },
  });
};
