'use client';

import Icon from './Icon/Icon';
import type { IconNameType } from './Icon/Icon.types';

export type TabKey = 'calendar' | 'home' | 'profile';

type BottomNavButtonProps = {
  tabKey: TabKey;
  isActive: boolean;
  activeIconName: IconNameType;
  inactiveIconName: IconNameType;
  onClick: (tabKey: TabKey) => void;
};

const BottomNavButton = ({
  tabKey,
  isActive,
  activeIconName,
  inactiveIconName,
  onClick,
}: BottomNavButtonProps) => {
  const iconName = isActive ? activeIconName : inactiveIconName;

  return (
    <button
      className="flex h-12 w-12 items-center justify-center"
      type="button"
      onClick={() => onClick(tabKey)}
      aria-pressed={isActive}
      aria-label={tabKey}
    >
      <Icon name={iconName} size={28} alt={tabKey} />
    </button>
  );
};

export default BottomNavButton;
