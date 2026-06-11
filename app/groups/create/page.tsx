import Link from 'next/link';

import { groupTypeSchema } from '@/src/components/features/groups/constants/groupType';
import GroupCreateForm from '@/src/components/features/groups/GroupCreateForm/GroupCreateForm';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import Icon from '@/src/components/ui/Icon/Icon';

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { type: typeParam } = await searchParams;
  const parseResult = groupTypeSchema.safeParse(typeParam);
  const type = parseResult.success ? parseResult.data : 'FRIEND';

  return (
    <>
      <PageHeader
        title="그룹 생성하기"
        leftIcon={
          <Link href="/groups">
            <Icon name="chevronLeft" size={28} alt="뒤로가기" />
          </Link>
        }
        className="fixed top-0 left-1/2 z-50 w-full max-w-110 -translate-x-1/2 bg-g-700 px-7.5"
      />
      <GroupCreateForm type={type} />
    </>
  );
}
