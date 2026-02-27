import type { KeyboardEventHandler } from 'react';

import Icon from '@/src/components/ui/Icon/Icon';
import { cn } from '@/src/lib/helpers/cn';

interface MenuRowProps {
  label: string;
  onClick?: () => void;
  rightText?: string;
  rightElement?: React.ReactNode;
  disabled?: boolean;
}

export const MenuRow = ({
  label,
  onClick,
  rightText,
  rightElement,
  disabled = false,
}: MenuRowProps) => {
  const isClickable = Boolean(onClick) && !disabled;

  const renderRight = () => {
    if (rightElement) return rightElement;

    if (rightText) {
      return <span className="font-body-s text-g-60">{rightText}</span>;
    }

    return <Icon size={18} name="chevronLeft" className="rotate-180" />;
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!isClickable || !onClick) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onClick={isClickable ? onClick : undefined}
      role={onClick ? 'button' : undefined}
      aria-disabled={onClick ? disabled : undefined}
      tabIndex={onClick && isClickable ? 0 : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      className={cn(
        'flex w-full items-center justify-between py-1',
        disabled ? 'cursor-not-allowed opacity-40' : 'opacity-100',
        isClickable ? 'cursor-pointer' : 'cursor-default',
      )}
    >
      <p className="font-body-s text-g-60">{label}</p>
      <div>{renderRight()}</div>
    </div>
  );
};
