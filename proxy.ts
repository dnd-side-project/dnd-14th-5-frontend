import {
  RequestCookies,
  ResponseCookies,
} from 'next/dist/server/web/spec-extension/cookies';
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
    return !payload.exp || payload.exp * 1000 < Date.now() + 5000;
  } catch {
    return true;
  }
};

function applySetCookie(req: NextRequest, res: NextResponse) {
  const setCookies = new ResponseCookies(res.headers);

  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

  const dummyRes = NextResponse.next({ request: { headers: newReqHeaders } });

  dummyRes.headers.forEach((value, key) => {
    if (
      key === 'x-middleware-override-headers' ||
      key.startsWith('x-middleware-request-')
    ) {
      res.headers.set(key, value);
    }
  });
}

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (accessToken && !isTokenExpired(accessToken)) return NextResponse.next();

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  try {
    const res = await fetch(`${API_BASE_URL}${USER_ENDPOINTS.reissue}`, {
      method: 'POST',
      headers: { Cookie: `refresh_token=${refreshToken}` },
    });

    if (!res.ok) throw new Error('reissue failed');

    const setCookies = res.headers.getSetCookie();
    const response = NextResponse.next();
    const isDev = process.env.NODE_ENV === 'development';

    setCookies.forEach((cookie) => {
      const modifiedCookie = isDev
        ? cookie
            .split(';')
            .filter((part) => {
              const trimmed = part.trim().toLowerCase();
              return !trimmed.startsWith('domain=') && trimmed !== 'secure';
            })
            .join('; ')
        : cookie;
      response.headers.append('set-cookie', modifiedCookie);
    });

    applySetCookie(request, response);

    return response;
  } catch {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('refresh_token');
    return response;
  }
}

export const config = {
  matcher: ['/'],
};
