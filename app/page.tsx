import HomeActionsSection from '@/src/components/features/home/HomeActionsSection/HomeActionsSection';
import HomeHeader from '@/src/components/features/home/HomeHeader/HomeHeader';
import HomePromptSection from '@/src/components/features/home/HomePromptSection/HomePromptSection';
import BottomNavBar from '@/src/components/layout/BottomNavBar/BottomNavBar';

const Home = () => {
  return (
    <div className="flex min-h-dvh flex-col overflow-hidden">
      <HomeHeader />

      <div className="flex flex-1 flex-col px-5 pb-28 pt-8">
        <div className="flex flex-1 flex-col">
          <HomePromptSection />

          {/* TODO: 캐릭터 넣어야 함 */}
          <section className="home-mascot flex flex-1 items-center justify-center pt-15">
            <div className="h-58 w-58 rounded-full bg-p-100" />
          </section>

          <HomeActionsSection />
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Home;
