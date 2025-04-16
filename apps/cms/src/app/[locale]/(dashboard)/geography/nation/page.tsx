import { Loading } from '@/components/common/Loading';
import { Suspense } from 'react';

interface NationPageProps {
  searchParams: { page?: string };
}

export default function NationPage({ searchParams }: NationPageProps) {
  return (
    <Suspense fallback={<Loading className="py-10" />}>
      <NationPageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function NationPageContent({ searchParams }: NationPageProps) {
  const resolvedParams = await Promise.resolve(searchParams);
  return <div>Nation Page</div>;
}
