import HomeActionsSection from '@/src/components/features/home/HomeActionsSection/HomeActionsSection';
import HomeHeader from '@/src/components/features/home/HomeHeader/HomeHeader';
import HomeTodayQuestionSectionBoundary from '@/src/components/features/home/HomeTodayQuestionSectionBoundary/HomeTodayQuestionSectionBoundary';
import BottomNavBar from '@/src/components/layout/BottomNavBar/BottomNavBar';

const Home = () => {
  return (
    <div className="flex min-h-dvh flex-col overflow-hidden">
      <HomeHeader />

      <div className="flex flex-1 flex-col pb-32 pt-8">
        <div className="flex flex-1 flex-col">
          <HomeTodayQuestionSectionBoundary />

          <HomeActionsSection />
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Home;
