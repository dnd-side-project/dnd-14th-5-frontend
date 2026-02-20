import LoginButton from '@/src/components/features/onboarding/LoginButton/LoginButton';

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <section className="flex flex-col items-center justify-center py-60">
        <>로고</>
        <p className="text-body-m text-g-0">시간 성향에 맞춘 나만의 회고</p>
      </section>

      <section className="space-y-4">
        <LoginButton provider="kakao" />
        <LoginButton provider="naver" />
        <LoginButton provider="google" />
      </section>
    </div>
  );
};

export default LoginPage;
