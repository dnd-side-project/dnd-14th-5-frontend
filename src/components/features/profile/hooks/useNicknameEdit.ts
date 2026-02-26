import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useToast } from '@/src/hooks/useToast';

import { useUpdateUserNameMutation } from '../../users/queries/useUpdateUserNameMutation';
import { useUserDetailQuery } from '../../users/queries/useUserDetailQuery';

const EMPTY_NICKNAME_ERROR_MESSAGE = '닉네임을 입력해주세요.';

export const useNicknameEdit = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { data } = useUserDetailQuery();
  const { mutateAsync: updateUserName, isPending } =
    useUpdateUserNameMutation();
  const [nickname, setNickname] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const resolvedNickname = nickname ?? data?.name ?? '';

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    const trimmedName = resolvedNickname.trim();

    if (!trimmedName) {
      setErrorMessage(EMPTY_NICKNAME_ERROR_MESSAGE);
      return;
    }

    try {
      await updateUserName({ name: trimmedName });
      router.push('/profile');
    } catch {
      showToast({ message: '닉네임 변경에 실패했어요.' });
    }
  };

  return {
    nickname: resolvedNickname,
    errorMessage,
    isPending,
    handleNicknameChange,
    handleSubmit,
  };
};
