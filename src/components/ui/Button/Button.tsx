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
      ? 'bg-[#292B37] text-#FFEB98'
      : 'bg-[#FFEB98] text-black';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`h-12 w-full rounded-full text-[16px] font-normal disabled:opacity-50 ${variantClassName}`}
    >
      {label}
    </button>
  );
};

export default Button;
