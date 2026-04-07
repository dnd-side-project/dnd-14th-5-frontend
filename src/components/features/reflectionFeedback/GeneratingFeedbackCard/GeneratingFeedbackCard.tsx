import Badge from '@/src/components/ui/Badge/Badge';
import Card from '@/src/components/ui/Card/Card';
import Icon from '@/src/components/ui/Icon/Icon';
import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

const GeneratingFeedbackCard = () => {
  return (
    <Card className="flex max-h-117.5 flex-col items-center justify-center gap-6 bg-g-500 px-8 py-10">
      <div className="space-y-2 text-center">
        <p className="font-heading-h3 text-g-0">피드백 생성중</p>
        <p className="font-body-s text-g-60">
          오늘 회고를 바탕으로 피드백을 생성하고 있어요.
        </p>
        <p className="font-body-s text-g-60">잠시만 기다려주세요.</p>
      </div>

      <div className="w-full space-y-3">
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" ariaLabel="피드백 본문 생성 중" />
          <Skeleton className="h-4 w-full" ariaLabel="피드백 본문 생성 중" />
          <Skeleton className="h-4 w-11/12" ariaLabel="피드백 본문 생성 중" />
          <Skeleton className="h-4 w-full" ariaLabel="피드백 본문 생성 중" />
          <Skeleton className="h-4 w-4/5" ariaLabel="피드백 본문 생성 중" />
        </div>
      </div>
    </Card>
  );
};

export default GeneratingFeedbackCard;
