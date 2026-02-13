import HomePromptSection from '@/src/components/features/home/HomePromptSection/HomePromptSection';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';
import BottomNavBar from '@/src/components/ui/BottomNavBar';
import Icon from '@/src/components/ui/Icon/Icon';

const Home = () => {
  return (
    <div className="flex min-h-dvh flex-col overflow-hidden">
      <PageHeader
        title=""
        leftIcon={<Icon name="timoTitle" size={72} />}
        leftSlotVariant="logo"
        rightIcon={<Icon name="bellInactive" size={28} />}
      />

      <div className="flex flex-1 flex-col px-5 pb-28 pt-8">
        <div className="flex flex-1 flex-col">
          <HomePromptSection />

          {/* TODO: 캐릭터 넣어야 함 */}
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
                className="flex h-12 flex-2 items-center justify-center rounded-full bg-primary text-button-l text-g-900"
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
