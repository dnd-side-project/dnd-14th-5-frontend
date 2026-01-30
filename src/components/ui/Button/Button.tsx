interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  label,
  variant = 'primary',
  disabled,
  onClick,
}: ButtonProps) => {
  const variantClassName =
    variant === 'secondary'
      ? 'bg-[var(--color-g-700)] text-[var(--color-primary)]'
      : 'bg-[var(--color-primary)] text-[var(--color-g-900)]';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`h-12 w-full rounded-[var(--radius-lg)] text-button-l disabled:opacity-50 ${variantClassName}`}
    >
      {label}
    </button>
  );
};

export default Button;
