'use client';
import Header from '@/src/components/header/header';
import Subtitle from '@/src/components/header/subtitle';
import MyFilingData from '@/src/components/project/myFilingData';
import { Project } from '@/src/interface/project';
import { useEffect, useState } from 'react';
import getProjectByProjectId from '@/src/service/project/getProjectByProjectId';
import { toast } from '@/src/components/ui/use-toast';
import updateLastOpen from '@/src/service/user-proj/updateLastOpen';
import { getUserId } from '@/src/service/auth';

export default function Page({ params }: { params: { projectId: string } }) {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (params.projectId) {
      const fetchProject = async () => {
        try {
          const data = await getProjectByProjectId(params.projectId);
          setProject(data);
        } catch (err) {
          if (err instanceof Error) {
            toast({
              title: 'ไม่สำเร็จ',
              description: err.message,
              isError: true,
            });
          }
        }
      };

      const updateLastOpenFetch = async () => {
        try {
          const userId = await getUserId();
          await updateLastOpen(userId, params.projectId);
        } catch (err) {
          if (err instanceof Error) {
            toast({
              title: 'ไม่สำเร็จ',
              description: err.message,
              isError: true,
            });
          }
        }
      };
      fetchProject().then(() => updateLastOpenFetch());
    }
  }, [params]);

  return (
    <>
      {project && (
        <main className="space-y-5 py-10 px-6">
          <Header>
            <Subtitle
              project={`${project.projectCode} ${project.name}`}
              projectId={params.projectId}
            />
          </Header>

          <MyFilingData projectId={params.projectId} />
        </main>
      )}
    </>
  );
}
