import { useEffect, useMemo, useState } from 'react';

import { useLoginMutation } from '../queries/useLoginMutation';
import { useReissueMutation } from '../queries/useReissueMutation';
import { getErrorMessage } from '../util/error';
import {
  clearStoredTokens,
  getStoredRefreshToken,
  persistTokens,
} from '../util/storage';

export const useTestAuth = () => {
  const [email, setEmail] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration mismatch 방지를 위해 마운트 후 1회만 로컬 스토리지 상태를 반영합니다.
    setHydrated(true);
    setRefreshToken(getStoredRefreshToken());
  }, []);
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
      const tokens = await loginMutation.mutateAsync(email);
      persistTokens(tokens.accessToken, tokens.refreshToken);
      setRefreshToken(tokens.refreshToken);
      setSuccessMessage('로그인 성공: 토큰이 로컬에 저장되었습니다.');
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const handleReissue = async () => {
    if (!refreshToken || loading) return;

    resetMessages();
    try {
      const tokens = await reissueMutation.mutateAsync(refreshToken);
      persistTokens(tokens.accessToken, tokens.refreshToken);
      setRefreshToken(tokens.refreshToken);
      setSuccessMessage('재발급 성공: 토큰이 로컬에 저장되었습니다.');
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const handleClear = () => {
    clearStoredTokens();
    setRefreshToken('');
    resetMessages();
  };

  return {
    email,
    setEmail,
    refreshToken,
    hydrated,
    loading,
    errorMessage,
    successMessage,
    handleLogin,
    handleReissue,
    handleClear,
  };
};
