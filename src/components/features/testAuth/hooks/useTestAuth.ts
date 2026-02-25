import { useMemo, useState } from 'react';

import { useReissueMutation } from '@/src/components/features/users/queries/useReissueMutation';

import { useLoginMutation } from '../queries/useLoginMutation';
import { getErrorMessage } from '../util/error';

export const useTestAuth = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const loginMutation = useLoginMutation();
  const reissueMutation = useReissueMutation();

  const loading = useMemo(
    () => loginMutation.isPending || reissueMutation.isPending,
    [loginMutation.isPending, reissueMutation.isPending],
  );

  const resetMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleLogin = async () => {
    if (!email || loading) return;

    resetMessages();
    try {
      await loginMutation.mutateAsync(email);
      setSuccessMessage('로그인 성공: 토큰이 쿠키에 저장되었습니다.');
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const handleReissue = async () => {
    if (loading) return;

    resetMessages();
    try {
      await reissueMutation.mutateAsync();
      setSuccessMessage('재발급 성공: 토큰이 쿠키에 갱신되었습니다.');
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const handleClear = () => {
    resetMessages();
  };

  return {
    email,
    setEmail,
    loading,
    errorMessage,
    successMessage,
    handleLogin,
    handleReissue,
    handleClear,
  };
};
