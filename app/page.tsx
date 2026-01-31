import BottomNavBar from '@/src/components/ui/BottomNavBar';

const Home = () => {
  return (
    <div className="flex min-h-dvh flex-col overflow-hidden">
      <header className="flex h-14 items-center justify-center shrink-0">
        헤더 영역(대체 필요)
      </header>

      <div className="flex flex-1 flex-col px-5 pb-28 pt-8">
        <div className="flex flex-1 flex-col">
          <section className="home-title">
            <div className="flex flex-col gap-2">
              <p className={'text-body-s text-g-100'}>오늘의 회고</p>
              <div className="flex flex-col gap-1">
                <h2 className="text-heading-h2">
                  오늘 하루 중 가장 재미있었던 순간은 언제였나요?
                </h2>
                <p className="text-body-s text-g-60">
                  지금 떠오르는 감정이나 생각을 부담없이 작성해보세요!
                </p>
              </div>
            </div>
          </section>

          <section className="home-mascot flex flex-1 items-center justify-center pt-15">
            <div className="h-58 w-58 rounded-full bg-p-100" />
          </section>

          <section className="home-actions">
            <div className="flex items-center gap-3">
              <button
                className="flex h-12 flex-1 items-center justify-center rounded-full border border-primary text-button-l text-primary"
                type="button"
              >
                건너뛰기
              </button>
              <button
                className="flex h-12 flex-1 items-center justify-center rounded-full bg-primary text-button-l text-g-900"
                type="button"
              >
                답변하기
              </button>
            </div>
          </section>
        </div>
      </div>

      <nav className="home-tabbar shrink-0">
        <BottomNavBar />
      </nav>
    </div>
  );
};

export default Home;
