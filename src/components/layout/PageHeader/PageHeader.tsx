import type { ReactNode } from 'react';

import { cn } from '@/src/lib/helpers/cn';

interface PageHeaderProps {
  title: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  leftSlotVariant?: 'icon' | 'logo';
  rightSlotVariant?: 'icon' | 'logo';
}

const PageHeader = ({
  title,
  leftIcon,
  rightIcon,
  onLeftClick,
  onRightClick,
  leftSlotVariant = 'icon',
  rightSlotVariant = 'icon',
}: PageHeaderProps) => {
  const slotBaseClassName = 'h-10 flex items-center justify-center';
  const slotVariantClassName = {
    icon: 'w-10',
    logo: 'w-auto',
  } as const;

  return (
    <header className="flex items-center gap-2 h-14">
      <button
        type="button"
        onClick={onLeftClick}
        className={cn(slotBaseClassName, slotVariantClassName[leftSlotVariant])}
        aria-label="left action"
      >
        {leftIcon ?? <div className="h-6 w-6 rounded-full" />}
      </button>

      <h1 className="flex-1 text-center font-heading-h3 text-g-0">{title}</h1>

      <button
        type="button"
        onClick={onRightClick}
        className={cn(
          slotBaseClassName,
          slotVariantClassName[rightSlotVariant],
        )}
        aria-label="right action"
      >
        {rightIcon ?? <div className="h-6 w-6 rounded-full" />}
      </button>
    </header>
  );
};

export default PageHeader;
