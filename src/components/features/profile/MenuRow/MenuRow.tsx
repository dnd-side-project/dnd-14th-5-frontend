import Icon from '@/src/components/ui/Icon/Icon';

interface MenuRowProps {
  label: string; // 왼쪽 텍스트 (필수)
  onClick?: () => void; // row 클릭
  rightText?: string; // 우측 텍스트
  rightElement?: React.ReactNode; // 우측 완전 커스텀
  disabled?: boolean;
}

export const MenuRow = ({
  label,
  onClick,
  rightText,
  rightElement,
  disabled = false,
}: MenuRowProps) => {
  const renderRight = () => {
    if (rightElement) return rightElement;

    if (rightText) {
      return <span className="text-body-s text-g-60">{rightText}</span>;
    }

    return <Icon size={18} name="chevronLeft" className="rotate-180" />;
  };

  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`
        flex items-center justify-between
        cursor-pointer py-1
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
      `}
    >
      <p className="text-body-s text-g-60">{label}</p>
      <div>{renderRight()}</div>
    </div>
  );
};
