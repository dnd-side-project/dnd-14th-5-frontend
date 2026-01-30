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
      ? 'border border-primary bg-g-700 text-primary'
      : 'bg-primary text-g-900';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`h-12 w-full rounded-4xl text-button-l disabled:opacity-50 ${variantClassName}`}
    >
      {label}
    </button>
  );
};

export default Button;
