import Detail from '@/src/components/features/reflectionDetail/Detail/Detail';
import Header from '@/src/components/features/reflectionDetail/Header/Header';

interface PageProps {
  params: Promise<{
    reflectionId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { reflectionId } = await params;

  return (
    <div className="space-y-10">
      <Header />
      <Detail reflectionId={+reflectionId} />
    </div>
  );
};

export default Page;
