'use client';

import { usePathname, useRouter } from 'next/navigation';

import type { IconNameType } from '@/src/components/ui/Icon/Icon.types';

import BottomNavButton, { type TabKey } from './BottomNavButton';

interface BottomTabItem {
  key: TabKey;
  activeIconName: IconNameType;
  inactiveIconName: IconNameType;
  href: string;
}

const bottomTabs: BottomTabItem[] = [
  {
    key: 'calendar',
    activeIconName: 'calendarActive',
    inactiveIconName: 'calendarInactive',
    href: '/calendar',
  },
  {
    key: 'home',
    activeIconName: 'homeActive',
    inactiveIconName: 'homeInactive',
    href: '/',
  },
  {
    key: 'profile',
    activeIconName: 'userActive',
    inactiveIconName: 'userInactive',
    href: '/profile',
  },
];

const BottomNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const activeMenu: TabKey =
    bottomTabs.find((tab) => tab.href === pathname)?.key ?? 'home';

  const handleTabClick = (tabKey: TabKey) => {
    const selectedTab = bottomTabs.find((tab) => tab.key === tabKey);
    if (!selectedTab) return;

    router.push(selectedTab.href);
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-10 w-full max-w-110 -translate-x-1/2 px-5">
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
