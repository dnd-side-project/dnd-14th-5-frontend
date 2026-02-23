import { type MouseEvent } from 'react';

import { cn } from '@/src/lib/helpers/cn';

interface ToggleSwitchProps {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  ariaLabel: string;
  disabled?: boolean;
  className?: string;
  checkedTrackClassName?: string;
  uncheckedTrackClassName?: string;
  checkedThumbClassName?: string;
  uncheckedThumbClassName?: string;
}

const ToggleSwitch = ({
  checked,
  onCheckedChange,
  ariaLabel,
  disabled = false,
  className,
  checkedTrackClassName = 'bg-primary',
  uncheckedTrackClassName = 'bg-g-300',
  checkedThumbClassName = 'bg-g-500',
  uncheckedThumbClassName = 'bg-g-0',
}: ToggleSwitchProps) => {
  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (disabled) {
      return;
    }

    onCheckedChange(!checked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={handleToggle}
      className={cn(
        'relative inline-flex h-6.5 w-12 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-g-700',
        checked ? checkedTrackClassName : uncheckedTrackClassName,
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'inline-block h-5 w-5 rounded-full transition-transform duration-200',
          checked ? checkedThumbClassName : uncheckedThumbClassName,
          checked ? 'translate-x-6' : 'translate-x-1',
        )}
      />
    </button>
  );
};

export default ToggleSwitch;
