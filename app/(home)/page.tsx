import HomeClientSections from '@/src/components/features/home/HomeClientSections/HomeClientSections';
import HomeHeader from '@/src/components/features/home/HomeHeader/HomeHeader';
import BottomNavBar from '@/src/components/layout/BottomNavBar/BottomNavBar';

const Home = () => {
  return (
    <div className="flex min-h-dvh flex-col overflow-hidden">
      <HomeHeader />

      <div className="flex flex-1 flex-col pb-32 pt-8">
        <HomeClientSections />
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Home;
