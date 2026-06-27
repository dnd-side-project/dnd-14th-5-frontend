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

  const uniqueFrames = frames.filter(
    (frame, index, self) =>
      self.findIndex((f) => f.filename === frame.filename) === index,
  );

  const results = await Promise.all(
    uniqueFrames.map(async (frame): Promise<GitHubFileContent | null> => {
      try {
        const encodedPath = frame.filename
          .split('/')
          .map(encodeURIComponent)
          .join('/');
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodedPath}?ref=${branch}`;
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3.raw',
          },
        });
        if (!response.ok) return null;
        const content = await response.text();
        return {
          filename: frame.filename,
          content: truncateFile(content, frame.lineno),
          lineno: frame.lineno,
        };
      } catch {
        return null;
      }
    }),
  );

  return results.filter((r): r is GitHubFileContent => r !== null);
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
