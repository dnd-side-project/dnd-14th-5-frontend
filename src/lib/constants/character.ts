export interface CharacterAsset {
  src: string;
  homeSrc: string;
  alt: string;
  color: string;
  resultSrc: string;
  name: string;
}

export const DEFAULT_CHARACTER: CharacterAsset = {
  src: '/character/present-hedonistic-now.svg',
  alt: '현재 쾌락 캐릭터',
  color: 'text-p-300',
  resultSrc: '/character/result-present-hedonistic.png',
  name: '지금이',
  homeSrc: '/character/home-present-hedonistic.png',
};

export const CATEGORY = [
  'PAST_POSITIVE',
  'PAST_NEGATIVE',
  'PRESENT_HEDONISTIC',
  'PRESENT_FATALISTIC',
  'FUTURE',
] as const;

export type Category = (typeof CATEGORY)[number];

export const CATEGORY_CHARACTER_MAP: Record<Category, CharacterAsset> = {
  PAST_POSITIVE: {
    src: '/character/past-positive-memory.svg',
    alt: '과거 긍정 캐릭터',
    color: 'text-b-300',
    resultSrc: '/character/result-past-positive.png',
    name: '추억이',
    homeSrc: '/character/home-past-positive.png',
  },
  PAST_NEGATIVE: {
    src: '/character/past-negative-shadow.svg',
    alt: '과거 부정 캐릭터',
    color: 'text-r-300',
    resultSrc: '/character/result-past-negative.png',
    name: '그늘이',
    homeSrc: '/character/home-past-negative.png',
  },
  PRESENT_HEDONISTIC: {
    src: '/character/present-hedonistic-now.svg',
    alt: '현재 쾌락 캐릭터',
    color: 'text-p-300',
    resultSrc: '/character/result-present-hedonistic.png',
    name: '지금이',
    homeSrc: '/character/home-present-hedonistic.png',
  },
  PRESENT_FATALISTIC: {
    src: '/character/present-fatalistic-calm.svg',
    alt: '현재 운명 캐릭터',
    color: 'text-gr-300',
    resultSrc: '/character/result-present-fatalistic.png',
    name: '담담이',
    homeSrc: '/character/home-present-fatalistic.png',
  },
  FUTURE: {
    src: '/character/future-oriented-tomorrow.svg',
    alt: '미래 지향 캐릭터',
    color: 'text-v-300',
    resultSrc: '/character/result-future-oriented.png',
    name: '내일이',
    homeSrc: '/character/home-future-oriented.png',
  },
};
