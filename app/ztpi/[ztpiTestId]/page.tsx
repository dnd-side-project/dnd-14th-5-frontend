import Result from '@/src/components/features/testResult/Result/Result';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';

interface ZtpiTestResultPageProps {
  params: Promise<{ ztpiTestId: string }>;
  searchParams: Promise<{ from?: string }>;
}

const ZtpiTestResultPage = async ({
  params,
  searchParams,
}: ZtpiTestResultPageProps) => {
  const { ztpiTestId } = await params;
  const { from } = await searchParams;

  return (
    <>
      <PageHeader title="테스트 결과" />
      <Result testRecordId={+ztpiTestId} from={from} />
    </>
  );
};

export default ZtpiTestResultPage;
