'use client';

import Image from 'next/image';

import { getCharacterAsset } from '@/src/lib/helpers/getCharacterAsset';

interface HomeCharacterSectionProps {
  category?: string;
}

const HomeCharacterSection = ({ category }: HomeCharacterSectionProps) => {
  const characterAsset = getCharacterAsset(category);

  return (
    <div className="flex flex-1 items-center justify-center py-7.5">
      <Image
        src={characterAsset.homeSrc}
        alt={characterAsset.alt}
        width={232}
        height={232}
        sizes="232px"
        className="h-58 w-58 object-contain"
        priority
      />
    </div>
  );
};

export default HomeCharacterSection;
