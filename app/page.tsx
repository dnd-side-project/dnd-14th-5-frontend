import HomeActionsSection from '@/src/components/features/home/HomeActionsSection/HomeActionsSection';
import HomeCharacterSection from '@/src/components/features/home/HomeCharacterSection/HomeCharacterSection';
import HomeHeader from '@/src/components/features/home/HomeHeader/HomeHeader';
import HomePromptSection from '@/src/components/features/home/HomePromptSection/HomePromptSection';
import { getTodayQuestion } from '@/src/components/features/reflection/queries/useTodayQuestionQuery';
import BottomNavBar from '@/src/components/layout/BottomNavBar/BottomNavBar';

const getTodayQuestionCategory = async () => {
  try {
    const data = await getTodayQuestion();
    return data.category;
  } catch {
    return undefined;
  }
};

const Home = async () => {
  const initialCategory = await getTodayQuestionCategory();

  return (
    <div className="flex min-h-dvh flex-col overflow-hidden">
      <HomeHeader />

      <div className="flex flex-1 flex-col px-5 pb-32 pt-8">
        <div className="flex flex-1 flex-col">
          <HomePromptSection />

          <HomeCharacterSection initialCategory={initialCategory} />

          <HomeActionsSection />
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Home;
