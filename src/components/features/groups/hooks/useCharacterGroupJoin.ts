import { useRouter } from 'next/navigation';

import { useToast } from '@/src/hooks/useToast';
import { isApiError } from '@/src/lib/api/error';

import { useGroupJoinQuery } from '../queries/useGroupJoinQuery';

export const useCharacterGroupJoin = () => {
  const router = useRouter();
  const { mutate, isPending } = useGroupJoinQuery();
  const { showToast } = useToast();

  const handleClose = () => router.push('/groups');

  const handleJoin = () => {
    mutate(
      { type: 'CHARACTER' },
      {
        onSuccess: () => {
          router.push('/groups');
          showToast({ message: '캐릭터 그룹에 참여했어요.' });
        },
        onError: (error) => {
          if (isApiError(error) && error.status === 400) {
            router.push('/groups');
            showToast({
              message:
                '캐릭터 유형이 설정되지 않았어요. ZTPI 테스트를 먼저 해주세요.',
              variant: 'alert',
            });
            return;
          }
          if (isApiError(error) && error.status === 409) {
            router.push('/groups');
            showToast({
              message: '이미 캐릭터 그룹에 참여했어요.',
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

  return { isPending, handleClose, handleJoin };
};
