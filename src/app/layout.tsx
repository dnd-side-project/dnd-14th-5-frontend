import '@/src/styles/globals.css';

import type { Metadata, Viewport } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { type ReactNode } from 'react';

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
      <body
        className={`${notoSansKr.variable} bg-[var(--color-g-700)] text-[var(--color-g-0)]`}
      >
        <main className="max-w-110 mx-auto w-full h-dvh">
          <QueryProvider>{children}</QueryProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
