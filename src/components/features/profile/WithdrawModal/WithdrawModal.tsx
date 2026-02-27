import Button from '@/src/components/ui/Button/Button';
import Modal from '@/src/components/ui/Modal/Modal';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isCloseDisabled?: boolean;
  isConfirmDisabled?: boolean;
}

const WithdrawModal = ({
  isOpen,
  onClose,
  onConfirm,
  isCloseDisabled = false,
  isConfirmDisabled = false,
}: WithdrawModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3 text-center">
          <h3 className="font-heading-h3 text-g-0">정말 떠나시나요?</h3>
          <div className="font-body-s text-g-80">
            <p>지금까지 남긴 회고와 기록이 모두 삭제돼요.</p>
            <p>삭제된 기록은 다시 복구할 수 없어요.</p>
            <p>그래도 탈퇴하시겠어요?</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            label="계속 기록하기"
            variant="secondary"
            onClick={onClose}
            disabled={isCloseDisabled}
            className="bg-g-400 h-11"
          />

          <Button
            label="탈퇴하기"
            variant="primary"
            onClick={onConfirm}
            disabled={isConfirmDisabled}
            className="h-11"
          />
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawModal;
