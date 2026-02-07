'use client';

import { useState } from 'react';

import BottomNavButton, { type TabKey } from './BottomNavButton';

const BottomNavBar = () => {
  const [activeMenu, setActiveMenu] = useState<TabKey>('home');
  const tabs: TabKey[] = ['calendar', 'home', 'profile'];

  const getIconClassName = (key: TabKey) => {
    if (key === activeMenu) {
      return 'bg-primary';
    }

    return 'bg-g-0/80';
  };

  const handleTabClick = (tabKey: TabKey) => {
    setActiveMenu(tabKey);
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-10 w-full h-16 max-w-105 -translate-x-1/2 px-5">
      <div className="flex items-center justify-center">
        <div className="flex w-full items-center justify-between rounded-full bg-g-500 px-6 py-3">
          {tabs.map((tabKey) => (
            <BottomNavButton
              key={tabKey}
              tabKey={tabKey}
              active={activeMenu === tabKey}
              iconClassName={getIconClassName(tabKey)}
              onClick={handleTabClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNavBar;
