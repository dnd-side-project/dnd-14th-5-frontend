import * as Sentry from '@sentry/nextjs';

export async function GET() {
  const error = new Error(`Sentry webhook test - ${Date.now()}`);
  Sentry.captureException(error);
  await Sentry.flush(2000);
  throw error;
}
