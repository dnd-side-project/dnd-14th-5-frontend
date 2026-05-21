'use client';

import { useEffect, useState } from 'react';

import GroupList from '@/src/components/features/groups/GroupList/GroupList';
import { useSuspenseGroupListQuery } from '@/src/components/features/groups/queries/useGroupListQuery';

import type { GroupType } from '../constants/groupType';

interface GroupListSectionProps {
  activeTab: GroupType;
  onGroupSelect: (id: number) => void;
}

const GroupListSection = ({
  activeTab,
  onGroupSelect,
}: GroupListSectionProps) => {
  const { data: groups } = useSuspenseGroupListQuery();

  const filteredGroups = groups.filter((g) => g.type === activeTab);
  const [selectedId, setSelectedId] = useState(filteredGroups[0]?.id ?? 0);

  useEffect(() => {
    onGroupSelect(filteredGroups[0]?.id ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (id: number) => {
    setSelectedId(id);
    onGroupSelect(id);
  };

  if (filteredGroups.length === 0) {
    return (
      <section className="flex h-28 flex-col items-center justify-center gap-1">
        <p className="font-body-s text-g-0">아직 참여 중인 그룹이 없어요</p>
        <p className="font-caption-n text-g-80">
          그룹을 만들고 친구들을 초대해보세요
        </p>
      </section>
    );
  }

  return (
    <section>
      <GroupList
        groups={filteredGroups}
        selectedId={selectedId}
        onSelect={handleSelect}
      />
    </section>
  );
};

export default GroupListSection;
