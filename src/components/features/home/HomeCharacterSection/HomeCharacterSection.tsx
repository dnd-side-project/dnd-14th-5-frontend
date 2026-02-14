import Image from 'next/image';

import { getCharacterAsset } from '@/src/components/features/home/util/character';

interface HomeCharacterSectionProps {
  initialCategory?: string;
}

const HomeCharacterSection = ({
  initialCategory,
}: HomeCharacterSectionProps) => {
  const characterAsset = getCharacterAsset(initialCategory);

  return (
    <div className="home-character flex flex-1 items-center justify-center py-7.5">
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
