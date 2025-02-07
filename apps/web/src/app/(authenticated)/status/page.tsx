import { FileSearch } from 'lucide-react';
import Header from '@/src/components/header/header';
import Title from '@/src/components/header/title';
import { getUserId } from '@/src/service/auth';
import StatusPage from '@/src/components/status/statusPage';

export default async function Page() {
  const userId = await getUserId();

  return (
    <main className="w-full py-16 px-12.5">
      <Header>
        <Title icon={<FileSearch size={40} />}>เอกสาร</Title>
      </Header>
      <StatusPage userId={userId} />
    </main>
  );
}
