'use client';
import Header from '@/src/components/header/header';
import Title from '@/src/components/header/title';
import ProjectForm from '@/src/components/new-project/projectForm';
import { toast } from '@/src/components/ui/use-toast';
import { projectFormAction } from '@/src/constant/formAction';
import { Project } from '@/src/interface/project';
import { User } from '@/src/interface/user';
import findJoinedUsersByProjectId from '@/src/service/user-proj/findJoinedUsersByProjectId';
import getProjectByProjectId from '@/src/service/project/getProjectByProjectId';
import { Folders } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProjectInfoPage() {
  const params = useParams();
  const { projectId } = params;
  const [project, setProject] = useState<Project | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectInfo = async () => {
      try {
        const [projectInfo, joinUsers] = await Promise.all([
          getProjectByProjectId(String(projectId)),
          findJoinedUsersByProjectId(String(projectId)),
        ]);
        console.log('joinUsers', joinUsers);

        setProject(projectInfo);
        setMembers(joinUsers);
      } catch (err) {
        if (err instanceof Error) {
          toast({
            title: 'โหลดข้อมูลโครงการไม่สำเร็จ',
            description: err.message,
            isError: true,
          });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProjectInfo();
  }, [projectId]);

  return (
    <>
      <main className="w-full pl-15 pr-5 pt-[68px] space-y-5 h-min-[100vh]">
        <Header>
          <Title icon={<Folders size={40} />} href="/admin/projects">
            รายละเอียดโครงการ
          </Title>
        </Header>

        <div className="">
          {!loading && members.length > 0 && project && (
            <ProjectForm
              project={project}
              formAction={projectFormAction.INFO}
              joinUsers={members}
              isAdmin
            />
          )}
        </div>
      </main>
    </>
  );
}
