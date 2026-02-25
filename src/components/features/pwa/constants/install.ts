export const INSTALL_PROMPT_SEEN_KEY = 'installPromptSeen';

export const INSTALL_DESCRIPTION = [
  {
    id: 1,
    content: '공유 버튼 클릭',
  },
  {
    id: 2,
    content: '\"홈 화면에 추가\" 선택',
  },
] as const;

export const IN_APP_BROWSER_REGEX =
  /KAKAOTALK|Instagram|FBAN|FBAV|FB_IAB|Line|NAVER|TikTok|Snapchat|Pinterest|YouTube/i;
