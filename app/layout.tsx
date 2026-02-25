import '@/src/styles/globals.css';

import type { Metadata, Viewport } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { type ReactNode } from 'react';

import InstallPrompt from '@/src/components/features/pwa/InstallPrompt/InstallPrompt';
import ToastProvider from '@/src/components/ui/Toast/ToastProvider';
import { cn } from '@/src/lib/helpers/cn';

import QueryProvider from './providers';

const notoSansKr = Noto_Sans_KR({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: 'TIMO',
  description: '일일 회고 서비스 TIMO',
  appleWebApp: {
    title: 'TIMO',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="ko">
      <body className={cn('bg-g-700 text-g-0', notoSansKr.variable)}>
        <main className="max-w-110 mx-auto w-full h-dvh p-10">
          <ToastProvider>
            <InstallPrompt />
            <QueryProvider>{children}</QueryProvider>
          </ToastProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
