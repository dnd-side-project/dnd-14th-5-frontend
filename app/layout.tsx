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
  description: '맞춤 질문으로 만드는 회고 습관',
  appleWebApp: {
    title: 'TIMO',
  },
  openGraph: {
    type: 'website',
    url: 'https://timo.io.kr',
    title: 'TIMO',
    description: '맞춤 질문으로 만드는 회고 습관',
    siteName: 'TIMO',
    locale: 'ko_KR',
    images: [
      {
        url: '/open-graph.png',
        width: 1200,
        height: 630,
        alt: 'TIMO - 맞춤 질문으로 만드는 회고 습관',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TIMO',
    description: '맞춤 질문으로 만드는 회고 습관',
    images: ['/open-graph.png'],
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
        <main className="max-w-110 mx-auto w-full h-dvh px-7.5">
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
