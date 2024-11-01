import { Radio } from 'lucide-react';
import Header from '@/src/components/header/header';
import Title from '@/src/components/header/title';
import { getUserId } from '@/src/service/auth';
import StatusPage from '@/src/components/status/StatusPage';

export default async function Page() {
  const userId = await getUserId();

  return (
    <main className="w-full pt-[68px]">
      <div className="pl-15 pr-5">
        <Header>
          <Title icon={<Radio size={40} />}>ติดตามสถานะ</Title>
        </Header>
      </div>
      <StatusPage userId={userId} />
    </main>
  );
}
