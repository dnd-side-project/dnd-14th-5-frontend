'use client';

import Link from 'next/link';
import { useState } from 'react';

import type { GroupType } from '@/src/components/features/groups/constants/groupType';
import Icon from '@/src/components/ui/Icon/Icon';
import { cn } from '@/src/lib/helpers/cn';

interface GroupActionMenuProps {
  activeTab: GroupType;
  onClose: () => void;
}

const GroupActionMenu = ({ activeTab, onClose }: GroupActionMenuProps) => {
  const [isJoinExpanded, setIsJoinExpanded] = useState(false);

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed top-14 right-[max(1.25rem,calc((100vw-27.5rem)/2+1.25rem))] z-50 w-44 rounded-2xl bg-g-500 py-1 shadow-lg">
        <Link
          href={`/groups/create?type=${activeTab}`}
          onClick={onClose}
          className="block w-full px-4 py-3 text-left font-button-s text-g-40 hover:bg-g-400/20"
        >
          그룹 생성하기
        </Link>

        <button
          type="button"
          onClick={() => setIsJoinExpanded((prev) => !prev)}
          className="flex w-full items-center justify-between px-4 py-3 font-button-s text-g-40 hover:bg-g-400/20"
        >
          그룹 참여하기
          <Icon
            name="chevronLeft"
            size={16}
            alt=""
            decorative
            className={cn(
              'transition-transform duration-200',
              isJoinExpanded ? 'rotate-270' : 'rotate-180',
            )}
          />
        </button>

        {isJoinExpanded ? (
          <div className="border-t border-g-400">
            <Link
              href="/groups?join=character"
              onClick={onClose}
              className="block w-full px-4 py-3 text-left font-button-s text-g-80 hover:bg-g-400/20"
            >
              캐릭터 회고 그룹 참여
            </Link>
            <Link
              href="/groups?join=friend"
              onClick={onClose}
              className="block w-full px-4 py-3 text-left font-button-s text-g-80 hover:bg-g-400/20"
            >
              친구 코드 입력
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default GroupActionMenu;
