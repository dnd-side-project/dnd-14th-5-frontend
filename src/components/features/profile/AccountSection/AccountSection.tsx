'use client';

import Card from '@/src/components/ui/Card/Card';

import { useAccountActions } from '../hooks/useAccountActions';
import { MenuRow } from '../MenuRow/MenuRow';
import WithdrawModal from '../WithdrawModal/WithdrawModal';

const AccountSection = () => {
  const {
    isPending,
    isWithdrawPending,
    isWithdrawModalOpen,
    handleLogout,
    openWithdrawModal,
    closeWithdrawModal,
    handleWithdraw,
  } = useAccountActions();

  return (
    <>
      <Card className="flex flex-col gap-4 bg-g-400 ">
        <MenuRow label="로그아웃" onClick={handleLogout} disabled={isPending} />
        <MenuRow
          label="탈퇴하기"
          onClick={openWithdrawModal}
          disabled={isPending}
        />
      </Card>

      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={closeWithdrawModal}
        onConfirm={handleWithdraw}
        isCloseDisabled={isWithdrawPending}
        isConfirmDisabled={isPending}
      />
    </>
  );
};

export default AccountSection;
