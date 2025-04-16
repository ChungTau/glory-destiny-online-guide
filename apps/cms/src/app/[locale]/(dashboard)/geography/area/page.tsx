import { Loading } from '@/components/common/Loading';
import { Suspense } from 'react';

interface AreaPageProps {
  searchParams: { page?: string };
}

export default function AreaPage({ searchParams }: AreaPageProps) {
  return (
    <Suspense fallback={<Loading className="py-10" />}>
      <AreaPageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function AreaPageContent({ searchParams }: AreaPageProps) {
  const resolvedParams = await Promise.resolve(searchParams);
  return <div>Area Page</div>;
}
