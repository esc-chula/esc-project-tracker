import FilingDetailPage from '@/src/components/filling-detail/filingDetailPage';
import { getUserId } from '@/src/service/auth';

export default async function Page({
  params,
  searchParams,
}: {
  params: { projectId: string; filingId: string };
  searchParams: { showCreateDocument: string };
}) {
  const userId = await getUserId();
  return (
    <FilingDetailPage
      params={params}
      searchParams={searchParams}
      userId={userId}
      isAdmin
    />
  );
}
