import { cn } from '@/src/lib/helpers/cn';

export type TabType = 'friend' | 'character';

const TABS = [
  { label: '친구', value: 'friend' },
  { label: '캐릭터', value: 'character' },
] as const;

interface GroupTabProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const GroupTab = ({ activeTab, onTabChange }: GroupTabProps) => {
  return (
    <div className="flex py-2">
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
