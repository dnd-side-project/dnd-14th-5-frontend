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
