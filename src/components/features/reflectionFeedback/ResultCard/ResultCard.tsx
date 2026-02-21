import Image from 'next/image';

import Badge from '@/src/components/ui/Badge/Badge';
import Card from '@/src/components/ui/Card/Card';
import Icon from '@/src/components/ui/Icon/Icon';

import { useUserDetailQuery } from '../../users/queries/useUserDetailQuery';
import { getCategoryMessage } from '../utils/getCategoryMessage';

interface ResultCardProps {
  feedback: string;
  category: string;
}

const ResultCard = ({ feedback, category }: ResultCardProps) => {
  const { data } = useUserDetailQuery();

  const streakDays = data?.streakDays ?? 0;
  const categoryMessage = getCategoryMessage(category);

  return (
    <Card className="flex h-117.5 flex-col items-center justify-center gap-6 bg-y-50 text-g-900">
      <Image
        src="/character/past-negative-shadow.svg"
        alt="여기 각 캐릭터 이름으로 대체"
        width={150}
        height={150}
      />

      <Badge variant="secondary">
        <div className="flex items-center gap-1">
          <Icon name="check" size={16} />
          <p>{streakDays}일 연속 회고 중!</p>
        </div>
      </Badge>

      <p className="text-heading-h3">{categoryMessage}</p>
      {/* TODO: 바뀐 텍스트 토큰으로 업데이트 필요 */}
      <p className="wrap-break-word text-justify text-body-m text-g-200">
        {feedback}
      </p>
    </Card>
  );
};

export default ResultCard;
