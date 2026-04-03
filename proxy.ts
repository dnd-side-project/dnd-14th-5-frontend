import { type NextRequest, NextResponse } from 'next/server';

import { USER_ENDPOINTS } from './src/components/features/users/constants/url';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const isTokenExpired = (token: string) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      '=',
    );
    const payload = JSON.parse(
      new TextDecoder().decode(
        Uint8Array.from(atob(padded), (c) => c.charCodeAt(0)),
      ),
    );
    return payload.exp * 1000 < Date.now() + 5000;
  } catch {
    return true;
  }
};

export async function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh_token');

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  const accessToken = request.cookies.get('access_token');
  const needsReissue = !accessToken || isTokenExpired(accessToken.value);

  if (needsReissue) {
    const reissueUrl = `${API_BASE_URL}${USER_ENDPOINTS.reissue}`;
    const headers = new Headers(request.headers);
    headers.set('host', new URL(reissueUrl).host);
    headers.delete('origin');
    headers.delete('referer');
    headers.delete('x-middleware-invoke');

    const reissueRes = await fetch(reissueUrl, {
      method: 'POST',
      headers,
      cache: 'no-store',
      signal: AbortSignal.timeout(3000),
    }).catch(() => null);

    const setCookies = reissueRes?.ok ? reissueRes.headers.getSetCookie() : [];

    if (setCookies.length === 0) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const redirectResponse = NextResponse.redirect(request.url);
    setCookies.forEach((cookie) => {
      const stripped = cookie
        .split(';')
        .filter((part) => !part.trim().toLowerCase().startsWith('domain='))
        .join('; ');
      redirectResponse.headers.append('Set-Cookie', stripped);
    });
    return redirectResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
