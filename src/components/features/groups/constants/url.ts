export const GROUP_ENDPOINT = {
  groups: '/groups',
  friendList: (groupId: number) => `/groups/${groupId}/reflections/today`,
} as const;

export const IMAGE_ENDPOINT = {
  upload: '/images',
} as const;
