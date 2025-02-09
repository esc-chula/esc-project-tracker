import { Folders } from 'lucide-react';
import Title from '@/src/components/header/title';
import Header from '@/src/components/header/header';
import ProjectForm from '@/src/components/new-project/projectForm';
import { projectFormAction } from '@/src/constant/formAction';

export default function Page() {
  return (
    <main className="py-10 px-6 space-y-5">
      <Header>
        <Title icon={<Folders size={40} />} href="/admin/projects">
          เปิดโครงการใหม่
        </Title>
      </Header>
      <ProjectForm formAction={projectFormAction.ADMIN_CREATE} isAdmin />
    </main>
  );
}
