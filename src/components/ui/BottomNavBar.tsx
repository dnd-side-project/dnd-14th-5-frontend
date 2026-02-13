'use client';

import { useState } from 'react';

import BottomNavButton, { type TabKey } from './BottomNavButton';
import type { IconNameType } from './Icon/Icon.types';

interface BottomTabItem {
  key: TabKey;
  activeIconName: IconNameType;
  inactiveIconName: IconNameType;
}

const bottomTabs: BottomTabItem[] = [
  {
    key: 'calendar',
    activeIconName: 'calendarActive',
    inactiveIconName: 'calendarInactive',
  },
  {
    key: 'home',
    activeIconName: 'homeActive',
    inactiveIconName: 'homeInactive',
  },
  {
    key: 'profile',
    activeIconName: 'userActive',
    inactiveIconName: 'userInactive',
  },
];

const BottomNavBar = () => {
  const [activeMenu, setActiveMenu] = useState<TabKey>('home');

  const handleTabClick = (tabKey: TabKey) => {
    setActiveMenu(tabKey);
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-10 w-full h-16 max-w-105 -translate-x-1/2 px-5">
      <div className="flex items-center justify-center">
        <div className="flex w-full items-center justify-between rounded-full bg-g-500 px-6 py-3">
          {bottomTabs.map((tab) => (
            <BottomNavButton
              key={tab.key}
              tabKey={tab.key}
              isActive={activeMenu === tab.key}
              activeIconName={tab.activeIconName}
              inactiveIconName={tab.inactiveIconName}
              onClick={handleTabClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNavBar;
