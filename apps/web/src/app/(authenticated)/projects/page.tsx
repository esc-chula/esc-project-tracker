import { Folders } from 'lucide-react';
import Header from '@/src/components/header/header';
import Title from '@/src/components/header/title';
import SelectTab from '@/src/components/all-projects/selectTab';
import { getUserId } from '@/src/service/auth';

export default async function Page() {
  const userId = await getUserId();
  return (
    <main className="space-y-5 py-10 px-6">
      <Header>
        <Title icon={<Folders size={40} />}>โครงการ</Title>
      </Header>
      <SelectTab isAdmin={false} userId={userId} />
    </main>
  );
}
