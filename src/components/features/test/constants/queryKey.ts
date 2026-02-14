export const TEST_QUERY_KEYS = {
  tests: ['tests'] as const,
  questions: (testId: number) =>
    [...TEST_QUERY_KEYS.tests, 'questions', testId] as const,
  responses: (testRecordId: number) =>
    [...TEST_QUERY_KEYS.tests, 'responses', testRecordId] as const,
  response: (testRecordId: number) =>
    [...TEST_QUERY_KEYS.tests, 'response', testRecordId] as const,
  registerQuestionResponse: (testRecordId: number) =>
    [
      ...TEST_QUERY_KEYS.tests,
      'registerQuestionResponse',
      testRecordId,
    ] as const,
  records: () => [...TEST_QUERY_KEYS.tests, 'records'] as const,
  complete: (testRecordId: number) =>
    [...TEST_QUERY_KEYS.tests, 'complete', testRecordId] as const,
};
