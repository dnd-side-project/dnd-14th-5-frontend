import Image from 'next/image';

import {
  type Category,
  CATEGORY_CHARACTER_MAP,
} from '@/src/components/features/home/const/character';
import Badge from '@/src/components/ui/Badge/Badge';
import Card from '@/src/components/ui/Card/Card';
import Icon from '@/src/components/ui/Icon/Icon';

import { useUserDetailQuery } from '../../users/queries/useUserDetailQuery';
import { getCategoryMessage } from '../utils/getCategoryMessage';

interface ResultCardProps {
  feedback: string;
  category: Category;
}

const ResultCard = ({ feedback, category }: ResultCardProps) => {
  const { data } = useUserDetailQuery();

  const streakDays = data?.streakDays ?? 0;
  const categoryMessage = getCategoryMessage(category);
  const characterAsset = CATEGORY_CHARACTER_MAP[category];

  return (
    <Card className="flex max-h-117.5 flex-col items-center justify-center gap-6 py-10 px-8 bg-g-500">
      <Badge variant="neutral">
        <div className="flex items-center gap-1">
          <Icon name="check" size={16} />
          <p>{streakDays}일 연속 회고 중!</p>
        </div>
      </Badge>

      <Image
        src={characterAsset.src}
        alt={characterAsset.alt}
        width={150}
        height={150}
      />

      <p className="text-heading-h3 text-g-0">
        {categoryMessage.prefix}
        <span className={characterAsset.color}>
          {categoryMessage.highlight}
        </span>
        {categoryMessage.suffix}
      </p>
      {/* TODO: 바뀐 텍스트 토큰으로 업데이트 필요 */}
      <div className="max-h-80 overflow-y-auto pr-2">
        <p className="wrap-break-word text-justify text-body-s text-g-80">
          {feedback}
        </p>
      </div>
    </Card>
  );
};

export default ResultCard;
