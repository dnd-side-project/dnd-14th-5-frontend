import Image from 'next/image';

import Badge from '@/src/components/ui/Badge/Badge';
import Card from '@/src/components/ui/Card/Card';
import Icon from '@/src/components/ui/Icon/Icon';

// TODO: content, category(아직 서버에 추가 x), score, 3개 사용해야 함. 지금은 임시 UI
interface ResultCardProps {
  content: string;
  status: string;
}

const ResultCard = ({ content, status }: ResultCardProps) => {
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
          {/* TODO: API 받아와서 streak 띄워주기 */}
          <p>첫 회고 달성!</p>
        </div>
      </Badge>

      <p className="text-heading-h3">오늘은 {status}를 많이 떠올리셨어요</p>
      <p className="wrap-break-word text-justify text-body-m text-g-200">
        {content}
      </p>
    </Card>
  );
};

export default ResultCard;
