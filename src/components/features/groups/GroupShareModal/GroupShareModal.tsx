import Button from '@/src/components/ui/Button/Button';
import Modal from '@/src/components/ui/Modal/Modal';

interface GroupShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: () => void;
}

const GroupShareModal = ({
  isOpen,
  onClose,
  onShare,
}: GroupShareModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h3 className="font-button-l text-primary">코드 생성 완료</h3>
          <p className="mt-3 font-body-s text-g-60">
            친구코드 생성이 완료되었습니다.
          </p>
          <p className="pt-5 font-body-s text-g-20">
            #코드 번호
            {/* TODO: 실제 코드 번호 */}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            label="공유하기"
            onClick={onShare}
            variant="secondary"
            size="s"
            className="bg-transparent"
          />
          <Button label="완료" onClick={onClose} size="s" />
        </div>
      </div>
    </Modal>
  );
};

export default GroupShareModal;
