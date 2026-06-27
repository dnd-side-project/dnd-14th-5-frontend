import { analyzeWithClaude } from './analyzeWithGemini';
import { createGitHubIssue } from './createGitHubIssue';
import { fetchGitHubCode } from './fetchGitHubCode';
import { parseStackTrace } from './parseStackTrace';
import type { SentryWebhookPayload } from './types';

export async function processSentryEvent(
  payload: SentryWebhookPayload,
): Promise<void> {
  const { event, issue } = payload.data;
  if (!issue) return;

  const errorType = event?.exception?.values?.[0]?.type ?? 'Error';
  const errorMessage =
    event?.exception?.values?.[0]?.value ?? event?.message ?? issue.title;

  const frames = event ? parseStackTrace(event) : [];
  const codeFiles = frames.length > 0 ? await fetchGitHubCode(frames) : [];

  const analysis = await analyzeWithClaude({
    errorType,
    errorMessage,
    frames,
    codeFiles,
    sentryIssueUrl: issue.permalink,
  });

  await createGitHubIssue({
    title: issue.title,
    analysis,
    errorType,
    errorMessage,
    sentryUrl: issue.permalink,
    frames,
  });
}
