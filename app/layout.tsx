import './globals.css';

import type { Metadata, Viewport } from 'next';
import { type ReactNode } from 'react';

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
      <body className="max-w-110 mx-auto w-full">{children}</body>
    </html>
  );
};

export default RootLayout;
