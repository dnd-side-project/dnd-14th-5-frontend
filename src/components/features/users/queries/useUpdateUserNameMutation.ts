import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { patch } from '@/src/lib/api';

import { userKeys } from '../constants/queryKeys';
import { USER_ENDPOINTS } from '../constants/url';

const updateUserNameRequestSchema = z.object({
  name: z.string(),
});

type UpdateUserNameRequest = z.infer<typeof updateUserNameRequestSchema>;

const updateUserName = async (request: UpdateUserNameRequest) => {
  return patch<UpdateUserNameRequest, unknown>(USER_ENDPOINTS.detail, request, {
    dataSchema: updateUserNameRequestSchema,
  });
};

export const useUpdateUserNameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: userKeys.updateName(),
    mutationFn: updateUserName,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(),
      });
    },
  });
};
