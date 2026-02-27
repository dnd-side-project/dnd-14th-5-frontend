import Button from '@/src/components/ui/Button/Button';
import Modal from '@/src/components/ui/Modal/Modal';
import TimeWheelPicker, {
  type TimeValue,
} from '@/src/components/ui/TimeWheelPicker/TimeWheelPicker';

interface NotificationTimeModalProps {
  isOpen: boolean;
  value: TimeValue;
  onChange: (next: TimeValue) => void;
  onClose: () => void;
  onSubmit: () => void;
  isPending: boolean;
}

const NotificationTimeModal = ({
  isOpen,
  value,
  onChange,
  onClose,
  onSubmit,
  isPending,
}: NotificationTimeModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-5">
        <h4 className="text-center font-heading-h4 text-g-0">알림 시간 변경</h4>

        <TimeWheelPicker value={value} onChange={onChange} minuteStep={10} />

        <div className="flex gap-2">
          <Button
            label="취소"
            variant="secondary"
            onClick={onClose}
            disabled={isPending}
            className="h-12 flex-1 rounded-4xl bg-g-400"
          />
          <Button
            label="저장"
            variant="primary"
            onClick={onSubmit}
            disabled={isPending}
            className="h-12 flex-1 rounded-4xl"
          />
        </div>
      </div>
    </Modal>
  );
};

export default NotificationTimeModal;
