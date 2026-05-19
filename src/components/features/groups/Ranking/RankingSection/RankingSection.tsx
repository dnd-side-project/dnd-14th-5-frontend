'use client';

import { useState } from 'react';

import { SORT_OPTIONS } from '../../constants/groupSort';
import { type GroupType, groupType } from '../../constants/groupType';
import RankingList from '../RankingList/RankingList';
import RankingSort from '../RankingSort/RankingSort';

interface RankingSectionProps {
  activeTab?: GroupType;
  groupId: number;
}

const RankingSection = ({
  activeTab = 'FRIEND',
  groupId,
}: RankingSectionProps) => {
  const [sort, setSort] = useState(SORT_OPTIONS[0].value);

  return (
    <section className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <p className="font-heading-h4 text-g-0">
          {activeTab === 'FRIEND' ? groupType.FRIEND : groupType.CHARACTER}
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
