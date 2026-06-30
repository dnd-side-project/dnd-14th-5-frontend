import { type ComponentProps } from 'react';

import { cn } from '@/src/lib/helpers/cn';

interface ButtonProps extends ComponentProps<'button'> {
  label: string;
  variant?: 'primary' | 'secondary';
  size?: 'l' | 's';
  disabled?: boolean;
}

const Button = ({
  label,
  variant = 'primary',
  size = 'l',
  disabled,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  const variantClassName =
    variant === 'secondary'
      ? 'border border-primary bg-g-700 text-primary'
      : 'bg-primary text-g-900';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'h-12 w-full rounded-4xl disabled:opacity-50',
        size === 's' ? 'font-button-s' : 'font-button-l',
        variantClassName,
        className,
      )}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
