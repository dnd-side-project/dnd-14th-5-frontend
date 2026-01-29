import Image from 'next/image';

import TextArea from '@/components/features/retrospective/TextArea/TextArea';
import BottomCTA from '@/components/layout/BottomCTA/BottomCTA';
import PageHeader from '@/components/layout/PageHeader/PageHeader';
import Button from '@/components/ui/Button/Button';

const RetrospectivePage = () => {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#292B37] text-white">
      <PageHeader
        title="기록하기"
        leftIcon={
          <Image
            src="/icons/chevron-left.svg"
            alt="back"
            width={28}
            height={28}
          />
        }
      />

      <main className="min-h-0 flex-1 overflow-y-auto scrollbar-transparent-track scrollbar-gutter-stable overscroll-contain">
        <div className="mx-auto flex max-w-110 flex-col gap-6 px-7.5 pb-24">
          <section>
            <div className="rounded-2xl  w-full bg-[#555557] p-4">
              <p className="text-[17px] font-semibold text-white">
                오늘 하루 중 가장 재미있었던 순간은 언제였나요?
              </p>
              <p className="text-[13px] font-normal text-[#ECECEC] opacity-50">
                지금 떠오르는 감정이나 생각을 부담없이 작성해보세요!
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <p className="text-[17px] font-bold text-white px-2">
              오늘 나의 생각은?
            </p>
            <TextArea />
          </section>
        </div>
      </main>

      <BottomCTA>
        <Button label="기록 완료" />
      </BottomCTA>
    </div>
  );
};

export default RetrospectivePage;
