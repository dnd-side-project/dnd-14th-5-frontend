import { type ComponentProps } from 'react';

import { cn } from '@/src/lib/helpers/cn';

interface ButtonProps extends ComponentProps<'button'> {
  label: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button = ({
  label,
  variant = 'primary',
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
        'h-12 w-full rounded-4xl font-button-l disabled:opacity-50',
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
