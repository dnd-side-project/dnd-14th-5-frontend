import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';

import { groupKeys } from '../constants/queryKey';
import { GROUP_ENDPOINT } from '../constants/url';

const ResponseSchema = z.array(
  z.object({
    id: z.string(),
    code: z.string(),
    name: z.string(),
    type: z.string(),
    image: z.string(),
  }),
);

type Response = z.infer<typeof ResponseSchema>;

const fetchGroups = () =>
  get<Response>(GROUP_ENDPOINT.groups, { responseSchema: ResponseSchema });

export const useGroupListQuery = () =>
  useQuery({
    queryKey: groupKeys.list(),
    queryFn: fetchGroups,
  });
