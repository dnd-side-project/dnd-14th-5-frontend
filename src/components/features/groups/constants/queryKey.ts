import type { SortValue } from './groupSort';

export const groupKeys = {
  all: () => ['groups'] as const,
  list: () => [...groupKeys.all(), 'list'] as const,
  friendList: (groupId: number, sort: SortValue) =>
    [...groupKeys.all(), 'friendList', groupId, sort] as const,
  create: () => [...groupKeys.all(), 'create'] as const,
};
