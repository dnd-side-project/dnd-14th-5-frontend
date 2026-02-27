import { useSuspenseQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { get } from '@/src/lib/api';
import { CATEGORY } from '@/src/lib/constants/character';

import { CHARACTERS_QUERY_KEYS } from '../constants/queryKeys';
import { CHARACTERS_ENDPOINT } from '../constants/url';

const CharacterSchema = z.object({
  id: z.number(),
  name: z.string(),
  englishName: z.enum(CATEGORY),
  characterName: z.string(),
  personality: z.string(),
  description: z.string(),
  idealValue: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type CharacterType = z.infer<typeof CharacterSchema>;

const ResponseSchema = z.array(CharacterSchema);
type ResponseType = z.infer<typeof ResponseSchema>;

export const timePerspectiveCategories = () =>
  get<ResponseType, never>(CHARACTERS_ENDPOINT.categories, {
    responseSchema: ResponseSchema,
  });

export const useTimePerspectiveCategories = () => {
  return useSuspenseQuery({
    queryKey: CHARACTERS_QUERY_KEYS.all,
    queryFn: () => timePerspectiveCategories(),
    staleTime: 60 * 1000 * 5,
  });
};
