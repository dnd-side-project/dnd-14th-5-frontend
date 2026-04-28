import Image from 'next/image';

import Badge from '@/src/components/ui/Badge/Badge';
import Card from '@/src/components/ui/Card/Card';
import Icon from '@/src/components/ui/Icon/Icon';
import {
  type Category,
  CATEGORY_CHARACTER_MAP,
} from '@/src/lib/constants/character';
import { cn } from '@/src/lib/helpers/cn';

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
    <Card className="flex flex-col items-center gap-6 py-10 px-8 bg-g-500 min-h-115 max-h-[calc(100dvh-200px)]">
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

      <p className="font-heading-h3 text-g-0">
        {categoryMessage.prefix}
        <span className={characterAsset.color}>
          {categoryMessage.highlight}
        </span>
        {categoryMessage.suffix}
      </p>

      <div
        className={cn(
          'flex-1 min-h-16 overflow-y-auto pr-2',
          '[scrollbar-width:thin]',
          '[scrollbar-color:color-mix(in_srgb,var(--color-g-0)_25%,transparent)_transparent]',
          '[&::-webkit-scrollbar]:w-2.5',
          '[&::-webkit-scrollbar-track]:bg-transparent',
          '[&::-webkit-scrollbar-thumb]:rounded-full',
          '[&::-webkit-scrollbar-thumb]:border-[3px]',
          '[&::-webkit-scrollbar-thumb]:border-transparent',
          '[&::-webkit-scrollbar-thumb]:bg-clip-content',
          '[&::-webkit-scrollbar-thumb]:bg-[color-mix(in_srgb,var(--color-g-0)_25%,transparent)]',
        )}
      >
        <p className="wrap-break-word text-justify font-body-s text-g-80">
          {feedback}3개월 뒤의 나에게 도움이 될 선택: 오늘 미루던 공부를 피하지
          않고 최소 1시간이라도 진행한 것 — 완벽하게 하려고 하기보다 꾸준히
          이어가는 습관이 시간이 지나면서 더 큰 차이를 만든다고 판단했기
          때문이고, 당장은 미미해 보여도 반복되면 분명히 누적된 결과로 돌아올
          것이라고 생각했다. 지금 떠오르는 감정이나 생각: 해야 할 일들이
          머릿속에 계속 맴돌면서도 막상 손을 대려니 부담이 느껴지고, 괜히 다른
          데로 신경이 분산되는 느낌이 있다. 그래도 아주 작은 단위라도 시작하면
          생각보다 금방 흐름을 탈 수 있을 것 같고, 지금 이 상태를 계속 끌고
          가기보다는 조금이라도 행동으로 옮기는 게 낫겠다는 생각이 든다. 완전히
          정리된 상태는 아니지만, 적어도 멈춰 있는 것보다는 나아가고 싶다는
          마음이 있다.
        </p>
      </div>
    </Card>
  );
};

export default ResultCard;
