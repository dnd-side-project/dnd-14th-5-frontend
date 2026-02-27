import {
  type Category,
  CATEGORY_CHARACTER_MAP,
  type CharacterAsset,
  DEFAULT_CHARACTER,
} from '@/src/lib/constants/character';

export const isCharacterCategory = (value?: string): value is Category => {
  return value !== undefined && value in CATEGORY_CHARACTER_MAP;
};

export const getCharacterAsset = (category?: string): CharacterAsset => {
  if (!isCharacterCategory(category)) {
    return DEFAULT_CHARACTER;
  }

  return CATEGORY_CHARACTER_MAP[category];
};
