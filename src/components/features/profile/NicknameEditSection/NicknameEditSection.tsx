'use client';

import BottomCTA from '@/src/components/layout/BottomCTA/BottomCTA';
import Button from '@/src/components/ui/Button/Button';
import { cn } from '@/src/lib/helpers/cn';

import { useNicknameEdit } from '../hooks/useNicknameEdit';

const NicknameEditSection = () => {
  // TODO: `border-r-300` 토큰 유틸이 의도대로 색상 유틸로 동작하도록 설정 점검 필요
  const {
    nickname,
    errorMessage,
    isPending,
    handleNicknameChange,
    handleSubmit,
  } = useNicknameEdit();

  return (
    <>
      <section className="pt-21 px-4">
        <h2 className="text-heading-h2">닉네임을 입력해주세요.</h2>
        <div className="mt-5">
          <label htmlFor="nickname" className="text-caption-n">
            닉네임
          </label>
          <input
            value={nickname}
            onChange={(event) => handleNicknameChange(event.target.value)}
            placeholder="닉네임"
            aria-label="닉네임"
            className={cn(
              'mt-2 h-12 w-full rounded-xl border bg-g-700 px-4 text-body-l text-g-0 placeholder:text-g-400 focus:outline-none',
              errorMessage ? 'border-[var(--color-r-300)]' : 'border-g-400',
            )}
          />
          {errorMessage ? (
            <p className="mt-2 pl-1 text-caption-n text-r-300">
              {errorMessage}
            </p>
          ) : null}
        </div>
      </section>

      <BottomCTA>
        <Button
          label={isPending ? '변경 중...' : '변경하기'}
          onClick={handleSubmit}
          disabled={isPending}
        />
      </BottomCTA>
    </>
  );
};

export default NicknameEditSection;
