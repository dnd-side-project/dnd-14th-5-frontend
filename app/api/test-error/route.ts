import { NextResponse } from 'next/server';

export async function GET() {
  throw new Error('Test error for Sentry webhook verification');
  return NextResponse.json({ ok: true });
}
