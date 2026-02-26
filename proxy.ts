import { type NextRequest, NextResponse } from 'next/server';

import { API_BASE_URL } from '@/src/lib/config/env';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token');

  if (!token) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  const response = await fetch(`${API_BASE_URL}/users/me`, {
    headers: {
      cookie: request.headers.get('cookie') ?? '',
    },
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  const user = await response.json();

  if (!user.isOnboarded) {
    return NextResponse.redirect(new URL('/ztpi-test', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
