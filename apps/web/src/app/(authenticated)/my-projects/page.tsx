import { Folders } from 'lucide-react';
import Header from '../../../components/header/header';
import Title from '@/src/components/header/title';
import MyProjectData from '@/src/components/project/myProjectData';

export default async function Page() {
  return (
    <>
      <main className="w-full pl-15 pr-5 pt-[68px] space-y-5 h-min-[100vh]">
        <Header>
          <Title icon={<Folders size={40} />}>โครงการของฉัน</Title>
        </Header>
        <MyProjectData />
      </main>
    </>
  );
}
