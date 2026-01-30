import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftClick?: () => void;
  onRightClick?: () => void;
}

const PageHeader = ({
  title,
  leftIcon,
  rightIcon,
  onLeftClick,
  onRightClick,
}: PageHeaderProps) => {
  return (
    <div className="flex items-center gap-2 h-14 px-5">
      <button
        type="button"
        onClick={onLeftClick}
        className="h-10 w-10 flex items-center justify-center"
        aria-label="left action"
      >
        {leftIcon ?? <div className="h-6 w-6 rounded-full" />}
      </button>

      <h1 className="flex-1 text-center text-heading-h3 text-g-0">{title}</h1>

      <button
        type="button"
        onClick={onRightClick}
        className="h-10 w-10 flex items-center justify-center"
        aria-label="right action"
      >
        {rightIcon ?? <div className="h-6 w-6 rounded-full" />}
      </button>
    </div>
  );
};

export default PageHeader;
