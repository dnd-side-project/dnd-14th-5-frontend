export const TEST_RESULT_ENDPOINTS = {
  record: (testRecordId: number) => `/test-records/${testRecordId}`,
} as const;
