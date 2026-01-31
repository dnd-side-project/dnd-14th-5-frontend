'use client';

import { useState } from 'react';

type TabKey = 'calendar' | 'home' | 'profile';

const BottomNavBar = () => {
  const [activeMenu, setActiveMenu] = useState<TabKey>('home');

  const getIconClassName = (key: TabKey) => {
    if (key === activeMenu) {
      return 'bg-primary';
    }

    return 'bg-g-0/80';
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-10 w-full h-16 max-w-105 -translate-x-1/2 px-5">
      <div className="flex items-center justify-center">
        <div className="flex w-full items-center justify-between rounded-full bg-g-500 px-6 py-3">
          <button
            className="flex h-12 w-12 items-center justify-center"
            type="button"
            onClick={() => setActiveMenu('calendar')}
            aria-pressed={activeMenu === 'calendar'}
          >
            <span
              className={`h-8 w-8 rounded-full ${getIconClassName('calendar')}`}
            />
          </button>
          <button
            className="flex h-12 w-12 items-center justify-center"
            type="button"
            onClick={() => setActiveMenu('home')}
            aria-pressed={activeMenu === 'home'}
          >
            <span
              className={`h-8 w-8 rounded-full ${getIconClassName('home')}`}
            />
          </button>
          <button
            className="flex h-12 w-12 items-center justify-center"
            type="button"
            onClick={() => setActiveMenu('profile')}
            aria-pressed={activeMenu === 'profile'}
          >
            <span
              className={`h-8 w-8 rounded-full ${getIconClassName('profile')}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomNavBar;
