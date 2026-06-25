import { NextResponse } from 'next/server';

export async function GET() {
  throw new Error(`Sentry webhook test - ${Date.now()}`);
  return NextResponse.json({ ok: true });
}
