'use client';

import { useTestAuth } from '@/src/components/features/testAuth/hooks/useTestAuth';

const TestAuthClient = () => {
  const {
    email,
    setEmail,
    loading,
    errorMessage,
    successMessage,
    handleLogin,
    handleReissue,
    handleClear,
  } = useTestAuth();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-g-0">Test Auth</h1>
        <p className="font-body-s text-g-0/70">
          개발 환경에서만 사용하는 테스트 인증 페이지입니다.
        </p>
        <p className="font-body-s text-g-0/50">
          성공 시 토큰이 쿠키에 저장됩니다.
        </p>
      </header>

      <section className="flex flex-col gap-4 rounded-2xl border border-g-0/10 bg-g-700 px-6 py-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="test-auth-email" className="font-body-s text-g-0/80">
            Email
          </label>
          <input
            id="test-auth-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            className="rounded-lg border border-g-0/20 bg-transparent px-4 py-3 font-body-s text-g-0 placeholder:text-g-0/40 focus:outline-none"
            placeholder="you@example.com"
            disabled={loading}
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading || email.trim().length === 0}
            className="rounded-lg bg-g-0 px-4 py-3 font-body-s font-semibold text-g-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
          <button
            type="button"
            onClick={handleReissue}
            disabled={loading}
            className="rounded-lg border border-g-0/30 px-4 py-3 font-body-s font-semibold text-g-0 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? '재발급 중...' : '토큰 재발급'}
          </button>
        </div>
        <button
          type="button"
          onClick={handleClear}
          className="self-start font-body-s text-g-0/70 underline decoration-g-0/40 underline-offset-4"
        >
          메시지 초기화
        </button>
        {successMessage ? (
          <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 font-body-s text-emerald-200">
            {successMessage}
          </p>
        ) : null}
        {errorMessage ? (
          <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 font-body-s text-red-200">
            {errorMessage}
          </p>
        ) : null}
      </section>
    </div>
  );
};

export default TestAuthClient;
