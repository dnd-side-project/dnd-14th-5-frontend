import Image from 'next/image';

import Icon from '@/src/components/ui/Icon/Icon';

const ResultCard = () => {
  return (
    // TODO: Card 컴포넌트로 대체 필요
    <div className="mt-10 flex h-117.5 flex-col items-center justify-center gap-6 rounded-lg bg-y-50 p-4 px-8 text-g-900">
      <Image
        src="/character/past-negative-shadow.svg"
        alt="여기 각 캐릭터 이름으로 대체"
        width={150}
        height={150}
      />

      {/* TODO: 배지 컴포넌트로 대체 필요 */}
      <div className="flex h-6 w-34 items-center gap-2 rounded-lg bg-g-0 px-6 text-caption-n">
        <Icon name="check" size={16} />
        <p>첫 회고 달성!</p>
      </div>

      <p className="text-heading-h3">오늘은 과거를 많이 떠올리셨어요</p>
      <p className="wrap-break-word text-justify text-body-m text-g-200">
        이 기억이 지금의 나에게 어떤 의미를 주고 있는지도 한번 생각해 볼 수
        있어요. 내일은 순간을 더 즐겨보는 건 어떨까요?
      </p>
    </div>
  );
};

export default ResultCard;
