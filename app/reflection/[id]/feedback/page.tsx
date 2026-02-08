import Image from 'next/image';

import BottomCTA from '@/src/components/layout/BottomCTA/BottomCTA';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import Button from '@/src/components/ui/Button/Button';
import Card from '@/src/components/ui/Card/Card';
import Icon from '@/src/components/ui/Icon/Icon';

const feedbackPage = () => {
  return (
    <div className="flex h-dvh flex-col">
      <PageHeader title="피드백" />
      <div className="px-7.5">
        {/* TODO: 카드 컴포넌트로 교체 */}
        <Card className="h-117.5 flex flex-col px-8 gap-6 items-center justify-center mt-10 bg-y-50 text-g-900">
          <Image
            src="/character/past-negative-shadow.svg"
            alt="여기 각 캐릭터 이름으로 대체"
            width={150}
            height={150}
          />
          {/* TODO: 배지 컴포넌트로 교체 */}
          <div className="flex items-center gap-2 w-34 h-6 px-6 text-caption-n bg-g-0 rounded-lg">
            <Icon name="check" size={16} />
            <p>첫 회고 달성!</p>
          </div>
          <p className="text-heading-h3">오늘은 과거를 많이 떠올리셨어요</p>
          <p className="text-body-m text-g-200 text-justify wrap-break-word">
            이 기억이 지금의 나에게 어떤 의미를 주고 있는지도 한번 생각해 볼 수
            있어요. 내일은 순간을 더 즐겨보는 건 어떨까요?
          </p>
        </Card>
      </div>

      <BottomCTA>
        <Button label="완료" />
      </BottomCTA>
    </div>
  );
};

export default feedbackPage;
