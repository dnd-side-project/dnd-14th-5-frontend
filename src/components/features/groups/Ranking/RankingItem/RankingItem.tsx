import Image from 'next/image';

import {
  type Category,
  CATEGORY_CHARACTER_MAP,
} from '@/src/lib/constants/character';

interface RankingItemProps {
  isExistImg: boolean;
  nickname: string;
  answerText: string;
  streakDays: number;
  ranking: number;
  // TODO: 사용자의 ZTPI 캐릭터 필요
  ztpiCharacter?: Category;
}

const RankingItem = ({
  isExistImg,
  nickname,
  answerText,
  streakDays,
  ranking,
  ztpiCharacter,
}: RankingItemProps) => {
  return (
    <li className="flex items-center gap-3">
      <div className="text-primary font-button-l">{ranking}</div>
      {isExistImg && (
        <Image
          // TODO: API 반영 후 nullish 제거
          src={CATEGORY_CHARACTER_MAP[ztpiCharacter ?? 'FUTURE'].profileSrc}
          width="50"
          height="50"
          alt="프로필"
        />
      )}

      <div className="min-w-0 flex-1 space-y-1">
        <p className="font-label-n text-g-0">{nickname}</p>
        <p className="font-caption-n text-g-60 truncate">{answerText}</p>
      </div>

      <div>
        <span className="font-label-n text-g-80">{streakDays}</span>
        <span className="font-caption-n text-g-80">일</span>
      </div>
    </li>
  );
};

export default RankingItem;
