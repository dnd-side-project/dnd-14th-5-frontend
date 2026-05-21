'use client';

import { Suspense, useState } from 'react';

import type { GroupType } from '@/src/components/features/groups/constants/groupType';
import GroupListSection from '@/src/components/features/groups/GroupListSection/GroupListSection';
import GroupTab from '@/src/components/features/groups/GroupTab/GroupTab';
import RankingSection from '@/src/components/features/groups/Ranking/RankingSection/RankingSection';

const GroupsPage = () => {
  const [activeTab, setActiveTab] = useState<GroupType>('FRIEND');
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-dvh">
      <GroupTab activeTab={activeTab} onTabChange={setActiveTab} />
      <Suspense fallback={null}>
        <GroupListSection
          key={activeTab}
          activeTab={activeTab}
          onGroupSelect={setSelectedGroupId}
        />
      </Suspense>
      {selectedGroupId !== null && (
        <div className="bg-g-500 -mx-7.5 px-7.5 py-6 mt-2 flex-1 min-h-0">
          <RankingSection groupId={selectedGroupId} activeTab={activeTab} />
        </div>
      )}
    </div>
  );
};

export default GroupsPage;
