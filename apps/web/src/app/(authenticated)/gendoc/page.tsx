import { FilePlus } from 'lucide-react';
import Header from '@/src/components/header/header';
import Title from '@/src/components/header/title';
import { getUserId } from '@/src/service/auth';
import GendocPage from '@/src/components/gendoc/gendocPage';

export default async function Page() {
  const userId = await getUserId();

  return (
    <main className="py-10 px-6">
      <Header>
        <Title icon={<FilePlus size={40} />}>Gen Doc</Title>
      </Header>
      <GendocPage userId={userId} />
    </main>
  );
}
