'use client';

export type TabKey = 'calendar' | 'home' | 'profile';

type BottomNavButtonProps = {
  tabKey: TabKey;
  active: boolean;
  iconClassName: string;
  onClick: (tabKey: TabKey) => void;
};

const BottomNavButton = ({
  tabKey,
  active,
  iconClassName,
  onClick,
}: BottomNavButtonProps) => {
  return (
    <button
      className="flex h-12 w-12 items-center justify-center"
      type="button"
      onClick={() => onClick(tabKey)}
      aria-pressed={active}
    >
      <span className={`h-8 w-8 rounded-full ${iconClassName}`} />
    </button>
  );
};

export default BottomNavButton;
