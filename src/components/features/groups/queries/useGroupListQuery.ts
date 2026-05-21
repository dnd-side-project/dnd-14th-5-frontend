import { useSuspenseQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';
import { CATEGORY } from '@/src/lib/constants/character';

import { groupTypeSchema } from '../constants/groupType';
import { groupKeys } from '../constants/queryKey';
import { GROUP_ENDPOINT } from '../constants/url';

const ResponseSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    type: groupTypeSchema,
    image: z.string().nullable(),
    category: z.enum(CATEGORY).nullable(),
    memberCount: z.number(),
    myRole: z.enum(['OWNER', 'MEMBER']),
    createdAt: z.coerce.date(),
  }),
);

type Response = z.infer<typeof ResponseSchema>;

const fetchGroups = () =>
  get<Response>(GROUP_ENDPOINT.groups, { responseSchema: ResponseSchema });

export const useSuspenseGroupListQuery = () =>
  useSuspenseQuery({
    queryKey: groupKeys.list(),
    queryFn: fetchGroups,
  });
