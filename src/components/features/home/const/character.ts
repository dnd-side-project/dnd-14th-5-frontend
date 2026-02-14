export interface CharacterAsset {
  src: string;
  alt: string;
}

export const DEFAULT_CHARACTER: CharacterAsset = {
  src: '/character/present-hedonistic-now.svg',
  alt: '현재 쾌락 캐릭터',
};

export const CATEGORY_CHARACTER_MAP: Record<string, CharacterAsset> = {
  PAST_POSITIVE: {
    src: '/character/past-positive-memory.svg',
    alt: '과거 긍정 캐릭터',
  },
  PAST_NEGATIVE: {
    src: '/character/past-negative-shadow.svg',
    alt: '과거 부정 캐릭터',
  },
  PRESENT_HEDONISTIC: {
    src: '/character/present-hedonistic-now.svg',
    alt: '현재 쾌락 캐릭터',
  },
  PRESENT_FATALISTIC: {
    src: '/character/present-fatalistic-calm.svg',
    alt: '현재 운명 캐릭터',
  },
  FUTURE: {
    src: '/character/future-oriented-tomorrow.svg',
    alt: '미래 지향 캐릭터',
  },
};
