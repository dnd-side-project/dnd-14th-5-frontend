export const GROUP_ENDPOINT = {
  groups: '/groups',
  friendList: (groupId: number) => `/groups/${groupId}/reflections/today`,
  joinGroup: '/groups/members',
} as const;

export const IMAGE_ENDPOINT = {
  upload: '/images',
} as const;
