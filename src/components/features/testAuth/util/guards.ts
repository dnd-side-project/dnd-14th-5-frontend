// TEMP: 프로덕션에서도 test-auth를 임시 허용합니다.
// 복구 방법: 이 상수를 삭제하고 아래 주석 처리된 원래 조건을 되살리면 됩니다.
const TEMP_ALLOW_TEST_AUTH_IN_PRODUCTION = true;

export const isTestAuthEnabled = () => {
  // Original code (복구용)
  // return process.env.NODE_ENV === 'development';
  return (
    process.env.NODE_ENV === 'development' || TEMP_ALLOW_TEST_AUTH_IN_PRODUCTION
  );
};

export const ensureDevelopment = () => {
  // Original code (복구용)
  // if (process.env.NODE_ENV !== 'development') {
  //   throw new Error('Test auth API is only available in development.');
  // }
  if (!isTestAuthEnabled()) {
    throw new Error('Test auth API is only available in development.');
  }
};
