import Result from '@/src/components/features/test/Result/Result';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';

interface ZtpiTestResultPageProps {
  params: Promise<{
    ztpiTestId: string;
  }>;
}

const ZtpiTestResultPage = async ({ params }: ZtpiTestResultPageProps) => {
  const { ztpiTestId } = await params;

  return (
    <>
      <PageHeader title="테스트 결과" />
      <Result testRecordId={+ztpiTestId} />
    </>
  );
};

export default ZtpiTestResultPage;
