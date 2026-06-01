'use client';

import { useState } from 'react';

import type { GroupType } from '@/src/components/features/groups/constants/groupType';
import GroupList from '@/src/components/features/groups/GroupList/GroupList';
import GroupTab from '@/src/components/features/groups/GroupTab/GroupTab';
import RankingSection from '@/src/components/features/groups/Ranking/RankingSection/RankingSection';
import BottomNavBar from '@/src/components/layout/BottomNavBar/BottomNavBar';

// TODO: 실제 API 연동 필요
const MOCK_FRIENDS_GROUPS = [
  { id: 1, name: '친구 모임', type: 'FRIEND' as const, image: '' },
  { id: 2, name: '어떤 모임', type: 'FRIEND' as const, image: '' },
  { id: 3, name: '친구 어떤 모임', type: 'FRIEND' as const, image: '' },
];

const MOCK_CHARACTERS_GROUPS = [
  { id: 1, name: '캐릭터 모임', type: 'CHARACTER' as const, image: '' },
  { id: 2, name: '어떤 모임', type: 'CHARACTER' as const, image: '' },
  { id: 3, name: '캐릭터 어떤 모임', type: 'CHARACTER' as const, image: '' },
];

const GroupsPage = () => {
  const [activeTab, setActiveTab] = useState<GroupType>('FRIEND');
  const [selectedId, setSelectedId] = useState(MOCK_FRIENDS_GROUPS[0]?.id ?? 0);

  return (
    <div className="flex flex-col h-dvh">
      <GroupTab activeTab={activeTab} onTabChange={setActiveTab} />
      <GroupList
        groups={
          activeTab === 'FRIEND' ? MOCK_FRIENDS_GROUPS : MOCK_CHARACTERS_GROUPS
        }
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <div className="bg-g-500 -mx-7.5 px-7.5 py-6 mt-2 flex-1 min-h-0">
        <RankingSection groupId={selectedId} activeTab={activeTab} />
      </div>

      <BottomNavBar />
    </div>
  );
};

export default GroupsPage;
