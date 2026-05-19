import { z } from 'zod';

export const groupTypeSchema = z.enum(['CHARACTER', 'FRIEND']);
export type GroupType = z.infer<typeof groupTypeSchema>;

export const groupType: Record<GroupType, string> = {
  CHARACTER: '캐릭터',
  FRIEND: '친구',
};
