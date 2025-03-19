import { FileSearch } from 'lucide-react';
import Header from '@/src/components/header/header';
import Title from '@/src/components/header/title';
import { getUserId } from '@/src/service/auth';
import StatusPage from '@/src/components/status/statusPage';

export default async function Page() {
  const userId = await getUserId();

  return (
    <main className="py-10 px-6">
      <Header>
        <Title icon={<FileSearch size={40} />}>เอกสาร</Title>
      </Header>
      <StatusPage userId={userId} isAdmin />
    </main>
  );
}
