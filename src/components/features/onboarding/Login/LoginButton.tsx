'use client';

import { type ComponentProps } from 'react';

import Button from '@/src/components/ui/Button/Button';
import { API_BASE_URL, DIRECT_API_BASE_URL } from '@/src/lib/config/env';
import { cn } from '@/src/lib/helpers/cn';

interface LoginButtonProps extends Omit<
  ComponentProps<typeof Button>,
  'label' | 'variant'
> {
  provider: 'kakao' | 'naver' | 'google';
}

const PROVIDER_CONFIG = {
  kakao: {
    label: '카카오로 시작하기',
    className:
      "bg-[#FEE500] text-g-900 before:bg-[url('/onboarding/kakao-logo.svg')]",
  },
  naver: {
    label: '네이버로 시작하기',
    className:
      "bg-[#02C75A] text-g-0 before:bg-[url('/onboarding/naver-logo.svg')]",
  },
  google: {
    label: 'Google로 시작하기',
    className:
      "bg-g-0 text-g-800 before:bg-[url('/onboarding/google-logo.svg')]",
  },
} as const;

const LoginButton = ({ provider }: LoginButtonProps) => {
  const config = PROVIDER_CONFIG[provider];

  const handleLogin = () => {
    window.location.href = `${DIRECT_API_BASE_URL}/auth/login/${provider}`;
  };

  return (
    <Button
      label={config.label}
      className={cn(
        'flex items-center justify-center gap-2 before:content-[""] before:block before:w-4 before:h-4 before:bg-contain before:bg-no-repeat h-10',
        config.className,
      )}
      onClick={handleLogin}
    />
  );
};

export default LoginButton;
