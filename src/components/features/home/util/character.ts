import {
  CATEGORY_CHARACTER_MAP,
  type CharacterAsset,
  DEFAULT_CHARACTER,
} from '@/src/components/features/home/const/character';

export const getCharacterAsset = (category?: string): CharacterAsset => {
  if (!category) {
    return DEFAULT_CHARACTER;
  }

  return CATEGORY_CHARACTER_MAP[category] ?? DEFAULT_CHARACTER;
};
