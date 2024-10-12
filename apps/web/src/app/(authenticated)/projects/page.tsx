import { Folders } from 'lucide-react';
import Header from '@/src/components/header/header';
import Title from '@/src/components/header/title';
import SelectTab from '@/src/components/all-projects/selectTab';
import { getUserId } from '@/src/service/auth';

export default async function Page() {
  const userId = await getUserId();
  return (
    <>
      <main className="w-full pl-15 pr-5 pt-[68px] space-y-5 h-min-[100vh]">
        <Header>
          <Title icon={<Folders size={40} />}>โครงการทั้งหมด</Title>
        </Header>
        <SelectTab isAdmin={false} userId={userId} />
      </main>
    </>
  );
}
