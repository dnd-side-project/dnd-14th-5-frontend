export const dynamic = 'force-dynamic';

import BottomNavBar from '@/src/components/layout/BottomNavBar/BottomNavBar';

import GroupsPageClient from './GroupsPageClient';

interface PageProps {
  searchParams: Promise<{ join?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { join } = await searchParams;

  return (
    <>
      <GroupsPageClient joinParam={join ?? null} />
      <BottomNavBar />
    </>
  );
}
