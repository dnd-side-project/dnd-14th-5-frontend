'use client';

import { useState } from 'react';

import { SORT_OPTIONS } from '../../constants/groupSort';
import type { TabType } from '../../GroupTab/GroupTab';
import RankingList from '../RankingList/RankingList';
import RankingSort from '../RankingSort/RankingSort';

interface RankingSectionProps {
  activeTab?: TabType;
  groupId: number;
}

const RankingSection = ({
  activeTab = 'friend',
  groupId,
}: RankingSectionProps) => {
  const [sort, setSort] = useState(SORT_OPTIONS[0].value);

  return (
    <section className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <p className="font-heading-h4 text-g-0">
          {activeTab === 'friend' ? '친구' : '캐릭터'}
        </p>

        <RankingSort
          options={SORT_OPTIONS}
          defaultValue={SORT_OPTIONS[0].value}
          onChange={setSort}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <RankingList groupId={groupId} sort={sort} activeTab={activeTab} />
      </div>
    </section>
  );
};

export default RankingSection;
