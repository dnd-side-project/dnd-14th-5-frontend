import Button from '@/src/components/ui/Button/Button';
import Modal from '@/src/components/ui/Modal/Modal';

import { useCharacterGroupJoin } from '../../hooks/useCharacterGroupJoin';

const CharacterGroupJoin = () => {
  const { isPending, handleClose, handleJoin } = useCharacterGroupJoin();

  return (
    <Modal isOpen onClose={handleClose}>
      <article className="space-y-6">
        <section className="text-center space-y-2">
          <p className="font-button-l text-primary">캐릭터 회고 그룹 참여</p>
          <p className="font-body-s text-g-60">
            내 캐릭터 회고 그룹에 참여하시겠어요?
          </p>
        </section>

        <section className="flex gap-2">
          <Button
            label="참여하기"
            aria-label="참여하기"
            className="font-button-s"
            disabled={isPending}
            onClick={handleJoin}
          />
          <Button
            label="취소하기"
            aria-label="취소하기"
            variant="secondary"
            className="font-button-s bg-transparent backdrop-blur-[50px]"
            disabled={isPending}
            onClick={handleClose}
          />
        </section>
      </article>
    </Modal>
  );
};

export default CharacterGroupJoin;
