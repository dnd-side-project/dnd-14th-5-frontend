export const dynamic = 'force-dynamic';

import BottomNavBar from '@/src/components/layout/BottomNavBar/BottomNavBar';

import GroupsPageClient from './GroupsPageClient';

export default function Page() {
  return (
    <>
      <GroupsPageClient />
      <BottomNavBar />
    </>
  );
}
