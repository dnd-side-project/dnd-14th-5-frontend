import type { ParsedFrame } from './parseStackTrace';

interface GitHubFileContent {
  filename: string;
  content: string;
  lineno: number;
}

export async function fetchGitHubCode(
  frames: ParsedFrame[],
): Promise<GitHubFileContent[]> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH ?? 'main';

  if (!token || !owner || !repo)
    throw new Error('GitHub environment variables not configured');

  const results: GitHubFileContent[] = [];
  const seenFiles = new Set<string>();

  for (const frame of frames) {
    if (seenFiles.has(frame.filename)) continue;
    seenFiles.add(frame.filename);
    try {
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${frame.filename}?ref=${branch}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3.raw',
        },
      });
      if (!response.ok) continue;
      const content = await response.text();
      results.push({
        filename: frame.filename,
        content: truncateFile(content, frame.lineno),
        lineno: frame.lineno,
      });
    } catch {
      // Skip files that can't be fetched
    }
  }
  return results;
}

function truncateFile(content: string, errorLine: number): string {
  const lines = content.split('\n');
  const start = Math.max(0, errorLine - 30);
  const end = Math.min(lines.length, errorLine + 30);
  const excerptLines = lines.slice(start, end);
  if (start > 0) excerptLines.unshift(`// ... (lines 1-${start} omitted)`);
  if (end < lines.length)
    excerptLines.push(`// ... (lines ${end + 1}-${lines.length} omitted)`);
  return excerptLines.join('\n');
}
