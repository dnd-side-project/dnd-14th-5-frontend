import Image from 'next/image';

import TextArea from '@/src/components/features/retrospective/TextArea/TextArea';
import BottomCTA from '@/src/components/layout/BottomCTA/BottomCTA';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import Button from '@/src/components/ui/Button/Button';

import styles from './page.module.css';

const RetrospectivePage = () => {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
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

      <main
        className={`min-h-0 flex-1 overflow-y-auto overscroll-contain ${styles.scrollArea}`}
      >
        <div className="mx-auto flex flex-col gap-6 px-7.5 pt-10 pb-24">
          <section>
            <div className="w-full rounded-lg bg-g-400 p-4">
              <p className="text-heading-h4 text-g-0">
                오늘 하루 중 가장 재미있었던 순간은 언제였나요?
              </p>
              <p className="text-caption-n text-g-30 opacity-50">
                지금 떠오르는 감정이나 생각을 부담없이 작성해보세요!
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <p className="px-2 text-heading-h4 text-g-0">오늘 나의 생각은?</p>
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
