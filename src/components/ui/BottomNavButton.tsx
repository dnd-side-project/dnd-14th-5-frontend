'use client';

export type TabKey = 'calendar' | 'home' | 'profile';

type BottomNavButtonProps = {
  tabKey: TabKey;
  isActive: boolean;
  iconClassName: string;
  onClick: (tabKey: TabKey) => void;
};

const BottomNavButton = ({
  tabKey,
  isActive,
  iconClassName,
  onClick,
}: BottomNavButtonProps) => {
  return (
    <button
      className="flex h-12 w-12 items-center justify-center"
      type="button"
      onClick={() => onClick(tabKey)}
      aria-pressed={isActive}
    >
      <span className={`h-8 w-8 rounded-full ${iconClassName}`} />
    </button>
  );
};

export default BottomNavButton;
