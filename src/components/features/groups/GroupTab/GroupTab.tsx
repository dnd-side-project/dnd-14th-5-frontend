import { cn } from '@/src/lib/helpers/cn';

import type { GroupType } from '../constants/groupType';
import { groupType } from '../constants/groupType';

const TABS: { label: string; value: GroupType }[] = [
  { label: groupType.FRIEND, value: 'FRIEND' },
  { label: groupType.CHARACTER, value: 'CHARACTER' },
];

interface GroupTabProps {
  activeTab: GroupType;
  onTabChange: (tab: GroupType) => void;
}

const GroupTab = ({ activeTab, onTabChange }: GroupTabProps) => {
  return (
    <div className="flex py-1">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onTabChange(tab.value)}
          className={cn(
            'font-body-s px-4 pb-2 border-b-2 transition-colors duration-300',
            activeTab === tab.value
              ? 'text-g-0 border-g-0'
              : 'text-g-80 border-transparent',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default GroupTab;
