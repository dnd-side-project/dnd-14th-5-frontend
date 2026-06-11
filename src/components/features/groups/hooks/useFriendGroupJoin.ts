import { useState } from 'react';

import { useToast } from '@/src/hooks/useToast';
import { isApiError } from '@/src/lib/api/error';

import { useGroupJoinQuery } from '../queries/useGroupJoinQuery';

const JOIN_ERROR_MESSAGES: Record<number, string> = {
  404: '그룹을 찾을 수 없어요',
  409: '이미 참여한 그룹이에요',
};

export const useFriendGroupJoin = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [groupCode, setGroupCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate, isPending } = useGroupJoinQuery();
  const { showToast } = useToast();

  const handleChange = (value: string) => {
    setGroupCode(value);
    setErrorMessage('');
  };

  const handleClose = () => setIsOpen(false);

  const handleSubmit = () => {
    const trimmedCode = groupCode.trim();
    if (!trimmedCode) return;

    setErrorMessage('');
    mutate(
      { type: 'FRIEND', code: trimmedCode },
      {
        onSuccess: () => {
          setIsOpen(false);
          showToast({ message: '그룹에 참여했어요.' });
        },
        onError: (error) => {
          if (isApiError(error) && error.status !== null) {
            setErrorMessage(JOIN_ERROR_MESSAGES[error.status] ?? '');
            return;
          }

          setErrorMessage('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
        },
      },
    );
  };

  return {
    isOpen,
    groupCode,
    errorMessage,
    isSubmitDisabled: isPending || groupCode.trim() === '',
    handleClose,
    handleChange,
    handleSubmit,
  };
};
