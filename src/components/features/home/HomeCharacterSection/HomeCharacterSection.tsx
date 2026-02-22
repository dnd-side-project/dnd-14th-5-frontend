'use client';

import Image from 'next/image';

import { getCharacterAsset } from '@/src/components/features/home/util/character';

interface HomeCharacterSectionProps {
  category?: string;
}

const HomeCharacterSection = ({ category }: HomeCharacterSectionProps) => {
  {
    /* TODO: 홈 화면만의 캐릭터로 바꿔줘야 함 */
  }
  const characterAsset = getCharacterAsset(category);

  return (
    <div className="flex flex-1 items-center justify-center py-7.5">
      <Image
        src={characterAsset.src}
        alt={characterAsset.alt}
        width={232}
        height={232}
        className="h-58 w-58"
        priority
      />
    </div>
  );
};

export default HomeCharacterSection;
