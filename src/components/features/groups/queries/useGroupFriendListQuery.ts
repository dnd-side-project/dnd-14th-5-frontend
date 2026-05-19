import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';
import { CATEGORY } from '@/src/lib/constants/character';

import { sortValueSchema } from '../constants/groupSort';
import { groupKeys } from '../constants/queryKey';
import { GROUP_ENDPOINT } from '../constants/url';

const GroupFriendListSchema = z.object({
  userId: z.number(),
  nickname: z.string(),
  questionContent: z.string(),
  questionCategory: z.enum(CATEGORY),
  answerText: z.string(),
  streakDays: z.number(),
  totalDays: z.number(),
});
const ResponseSchema = z.array(GroupFriendListSchema);
type ResponseType = z.infer<typeof ResponseSchema>;

const ParamsSchema = z.object({
  sort: sortValueSchema,
});
type ParamsType = z.infer<typeof ParamsSchema>;

export const groupFriendList = ({
  groupId,
  sort,
}: { groupId: number } & ParamsType) =>
  get<ResponseType, ParamsType>(GROUP_ENDPOINT.friendList(groupId), {
    params: { sort },
    paramsSchema: ParamsSchema,
    responseSchema: ResponseSchema,
  });

export const useGroupFriendListQuery = ({
  groupId,
  sort,
}: { groupId: number } & ParamsType) => {
  return useQuery({
    queryKey: groupKeys.friendList(groupId, sort),
    queryFn: () => groupFriendList({ groupId, sort }),
    staleTime: 60 * 1000 * 5,
  });
};
