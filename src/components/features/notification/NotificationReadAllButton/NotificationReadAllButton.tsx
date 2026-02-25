interface NotificationReadAllButtonProps {
  disabled: boolean;
  onClick: () => void;
}

const NotificationReadAllButton = ({
  disabled,
  onClick,
}: NotificationReadAllButtonProps) => {
  return (
    <button
      type="button"
      className="font-caption-n text-g-100 disabled:cursor-not-allowed disabled:text-g-300"
      disabled={disabled}
      onClick={onClick}
    >
      모두 읽기
    </button>
  );
};

export default NotificationReadAllButton;
