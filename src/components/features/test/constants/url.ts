export const TEST_ENDPOINTS = {
  tests: '/tests',
  questions: (testId: number) => `/tests/${testId}/questions`,
  records: `/test-records`,
  responses: (testRecordId: number) =>
    `/test-records/${testRecordId}/responses`,
  response: (testRecordId: number, responseId: number) =>
    `/test-records/${testRecordId}/responses/${responseId}`,
  complete: (testRecordId: number) => `/test-records/${testRecordId}/complete`,
  myRecords: `/test-records/me`,
} as const;
