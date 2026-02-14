'use client';

import Image from 'next/image';

import { getCharacterAsset } from '@/src/components/features/home/util/character';
import { useTodayQuestionQuery } from '@/src/components/features/reflection/queries/useTodayQuestionQuery';
import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

const HomeCharacterSection = () => {
  const { data, isPending } = useTodayQuestionQuery();
  const characterAsset = getCharacterAsset(data?.category);

  return (
    <div className="home-character flex flex-1 items-center justify-center py-7.5">
      {isPending ? (
        <Skeleton
          className="h-58 w-58 rounded-full"
          ariaLabel="캐릭터 로딩 중"
        />
      ) : (
        <Image
          src={characterAsset.src}
          alt={characterAsset.alt}
          width={232}
          height={232}
          className="h-58 w-58"
          priority
        />
      )}
    </div>
  );
};

export default HomeCharacterSection;
