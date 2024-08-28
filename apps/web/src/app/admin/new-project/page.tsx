import Title from '@/src/components/header/title';
import Header from '@/src/components/header/header';
import { Folders } from 'lucide-react';
import ProjectForm from '@/src/components/new-project/projectForm';
import { projectFormAction } from '@/src/constant/formAction';

export default function Page() {
  return (
    <>
      <main className="w-full pl-15 pr-5 pt-[68px] space-y-5 h-min-[100vh]">
        <Header>
          <Title icon={<Folders size={40} />} href="/admin/projects">
            เปิดโครงการใหม่
          </Title>
        </Header>
        <ProjectForm formAction={projectFormAction.ADMIN_CREATE} isAdmin />
      </main>
    </>
  );
}
