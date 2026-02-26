import { type NextRequest, NextResponse } from 'next/server';

import { API_BASE_URL } from '@/src/lib/config/env';

import { USER_ENDPOINTS } from './src/components/features/users/constants/url';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token');

  if (!token) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  try {
    const response = await fetch(`${API_BASE_URL}${USER_ENDPOINTS.detail}`, {
      headers: {
        cookie: request.headers.get('cookie') ?? '',
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(3000),
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }

    const user = await response.json();

    if (!user.isOnboarded) {
      return NextResponse.redirect(new URL('/ztpi-test', request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }
}

export const config = {
  matcher: ['/'],
};
