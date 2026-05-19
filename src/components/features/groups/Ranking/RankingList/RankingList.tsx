import ErrorState from '@/src/components/ui/ErrorState/ErrorState';
import Skeleton from '@/src/components/ui/Skeleton/Skeleton';

import type { SortValue } from '../../constants/groupSort';
import type { TabType } from '../../GroupTab/GroupTab';
import { useGroupFriendListQuery } from '../../queries/useGroupFriendListQuery';
import RankingItem from '../RankingItem/RankingItem';

interface RankingListProps {
  groupId: number;
  sort: SortValue;
  activeTab: TabType;
}

const RankingList = ({ groupId, sort, activeTab }: RankingListProps) => {
  const { data, isError, isPending } = useGroupFriendListQuery({
    groupId,
    sort,
  });

  if (isError)
    return (
      <ErrorState
        title="친구 리스트를 불러오지 못했어요."
        description="잠시 후 다시 시도해주세요."
      />
    );

  if (isPending) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-15" />
        <Skeleton className="h-15" />
        <Skeleton className="h-15" />
        <Skeleton className="h-15" />
        <Skeleton className="h-15" />
      </div>
    );
  }

  return (
    <ul className="space-y-8">
      {data.map((item, index) => (
        <RankingItem
          isExistImg={activeTab === 'friend'}
          key={item.userId}
          nickname={item.nickname}
          answerText={item.answerText}
          streakDays={item.streakDays}
          ranking={index + 1}
        />
      ))}
    </ul>
  );
};

export default RankingList;
