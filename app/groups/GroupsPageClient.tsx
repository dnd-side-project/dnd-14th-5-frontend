'use client';

import Image from 'next/image';
import { Suspense, useState } from 'react';

import type { GroupType } from '@/src/components/features/groups/constants/groupType';
import GroupListSection from '@/src/components/features/groups/GroupListSection/GroupListSection';
import GroupListSkeleton from '@/src/components/features/groups/GroupListSection/GroupListSkeleton';
import GroupTab from '@/src/components/features/groups/GroupTab/GroupTab';
import RankingSection from '@/src/components/features/groups/Ranking/RankingSection/RankingSection';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';

const GroupsPageClient = () => {
  const [activeTab, setActiveTab] = useState<GroupType>('FRIEND');
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-dvh">
      <PageHeader
        title="그룹 회고"
        rightIcon={
          <Image src="/icons/plus.svg" width={28} height={28} alt="그룹 추가" />
        }
        className="fixed top-0 left-1/2 z-50 w-full max-w-110 -translate-x-1/2 bg-g-700 px-5"
      />
      <div className="pt-14 flex flex-col flex-1 min-h-0">
        <GroupTab activeTab={activeTab} onTabChange={setActiveTab} />
        <Suspense fallback={<GroupListSkeleton />}>
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
    </div>
  );
};

export default GroupsPageClient;
