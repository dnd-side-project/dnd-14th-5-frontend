import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useToast } from '@/src/hooks/useToast';

import { useLogoutMutation } from '../queries/useLogoutMutation';
import { useWithdrawMutation } from '../queries/useWithdrawMutation';

interface UseAccountActionsResult {
  isPending: boolean;
  isWithdrawPending: boolean;
  isWithdrawModalOpen: boolean;
  handleLogout: () => Promise<void>;
  openWithdrawModal: () => void;
  closeWithdrawModal: () => void;
  handleWithdraw: () => Promise<void>;
}

export const useAccountActions = (): UseAccountActionsResult => {
  const router = useRouter();
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const { showToast } = useToast();

  const { mutateAsync: logout, isPending: isLogoutPending } =
    useLogoutMutation();
  const { mutateAsync: withdraw, isPending: isWithdrawPending } =
    useWithdrawMutation();

  const isPending = isLogoutPending || isWithdrawPending;

  const handleLogout = async () => {
    if (isPending) return;

    try {
      await logout();
      showToast({ message: '로그아웃 되었어요.' });
      router.push('/login');
      router.refresh();
    } catch {
      showToast({
        message: '로그아웃에 실패했어요. 잠시 후 다시 시도해주세요.',
      });
    }
  };

  const openWithdrawModal = () => {
    if (isPending) return;

    setIsWithdrawModalOpen(true);
  };
  const closeWithdrawModal = () => {
    if (isWithdrawPending) return;

    setIsWithdrawModalOpen(false);
  };

  const handleWithdraw = async () => {
    if (isPending) return;

    try {
      await withdraw();
      setIsWithdrawModalOpen(false);
      showToast({ message: '탈퇴가 완료되었어요.' });
      router.push('/login');
      router.refresh();
    } catch {
      showToast({ message: '탈퇴에 실패했어요. 잠시 후 다시 시도해주세요.' });
    }
  };

  return {
    isPending,
    isWithdrawPending,
    isWithdrawModalOpen,
    handleLogout,
    openWithdrawModal,
    closeWithdrawModal,
    handleWithdraw,
  };
};
