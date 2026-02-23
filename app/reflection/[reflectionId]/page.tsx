import Detail from '@/src/components/features/reflectionDetail/Detail/Detail';
import Header from '@/src/components/features/reflectionDetail/Header/Header';
import BottomNavBar from '@/src/components/layout/BottomNavBar/BottomNavBar';

interface PageProps {
  params: Promise<{
    reflectionId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { reflectionId } = await params;

  return (
    <div className="space-y-10 pb-20">
      <Header />
      <Detail reflectionId={+reflectionId} />
      <BottomNavBar />
    </div>
  );
};

export default Page;
