import * as Sentry from '@sentry/nextjs';

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return new Response('Not found', { status: 404 });
  }

  const error = new Error(`Sentry webhook test - ${Date.now()}`);
  Sentry.captureException(error);
  await Sentry.flush(2000);
  throw error;
}
