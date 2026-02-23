'use client';

import Image from 'next/image';

import { CATEGORY_CHARACTER_MAP } from '../../home/const/character';
import { useUserDetailQuery } from '../../users/queries/useUserDetailQuery';

const ProfileSummary = () => {
  const { data } = useUserDetailQuery();
  return (
    <div className="flex items-center gap-4">
      <Image
        src="/character/future-oriented-tomorrow.svg"
        alt="character"
        width={80}
        height={80}
      />
      <div className="flex flex-col text-body-s">
        <p>
          {data?.name ?? '사용자'}님은{' '}
          <span className="font-bold">
            <span className="text-pink-300">{'현재쾌락형'}</span>이에요.
          </span>
        </p>
        <p>
          <span className="text-pink-300">{'지금이'}</span>와 함께 시간을
          기록하고 있어요!
        </p>
      </div>
    </div>
  );
};

export default ProfileSummary;
