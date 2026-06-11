import { useState } from 'react';

import { useToast } from '@/src/hooks/useToast';
import { isApiError } from '@/src/lib/api/error';

import { useGroupJoinQuery } from '../queries/useGroupJoinQuery';

export const useCharacterGroupJoin = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { mutate, isPending } = useGroupJoinQuery();
  const { showToast } = useToast();

  const handleClose = () => setIsOpen(false);

  const handleJoin = () => {
    mutate(
      { type: 'CHARACTER' },
      {
        onSuccess: () => {
          setIsOpen(false);
          showToast({ message: '캐릭터 그룹에 참여했어요.' });
        },
        onError: (error) => {
          // TODO: 이미 참여한 경우(409)는 아예 메뉴에서 보이지 않게 할 예정
          if (isApiError(error) && error.status === 400) {
            setIsOpen(false);
            showToast({
              message: `캐릭터 유형이 설정되지 않았어요. ZTPI 테스트를 먼저 해주세요.`,
              variant: 'alert',
            });
            return;
          }

          showToast({
            message: '그룹 참여 중 오류가 발생했습니다. 다시 시도해주세요.',
            variant: 'alert',
          });
        },
      },
    );
  };

  return { isOpen, isPending, handleClose, handleJoin };
};
