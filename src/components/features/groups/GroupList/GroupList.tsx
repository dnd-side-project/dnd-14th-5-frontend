'use client';

import Image from 'next/image';

import { cn } from '@/src/lib/helpers/cn';

import type { GroupType } from '../constants/groupType';

interface GroupItem {
  id: number;
  name: string;
  type: GroupType;
  image: string | null;
}

interface GroupListProps {
  groups: GroupItem[];
  selectedId?: number;
  onSelect?: (id: number) => void;
}

const GroupList = ({ groups, selectedId, onSelect }: GroupListProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto py-2 scrollbar-x-transparent-track">
      {groups.map((item) => {
        const isSelected = selectedId === item.id;
        return (
          <button
            key={item.id}
            type="button"
            className="flex flex-col items-center gap-2 w-17.5 shrink-0 cursor-pointer"
            aria-pressed={isSelected}
            onClick={() => onSelect?.(item.id)}
          >
            <div className="relative">
              <Image
                src={item.image || '/images/default-group.svg'}
                alt={item.name}
                width={55}
                height={55}
                className="rounded-[10px]"
              />
              {!isSelected && (
                <div className="absolute inset-0 rounded-[10px] bg-g-900/60" />
              )}
            </div>
            <p
              className={cn(
                'font-caption-n break-keep text-center',
                isSelected ? 'text-g-0' : 'text-g-80',
              )}
            >
              {item.name}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default GroupList;
