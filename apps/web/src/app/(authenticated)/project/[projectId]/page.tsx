'use client';
import Header from '@/src/components/header/header';
import Subtitle from '@/src/components/header/subtitle';
import MyDocumentData from '@/src/components/project/myDocumentData';
import { Project } from '@/src/interface/project';
import { useEffect, useState } from 'react';
import getProjectByProjectId from '@/src/service/project/getProjectByProjectId';
import { useToast } from '@/src/components/ui/use-toast';
import updateLastOpen from '@/src/service/user-proj/updateLastOpen';

export default function Page({ params }: { params: { projectId: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const { toast } = useToast();

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
      ('d1c0d106-1a4a-4729-9033-1b2b2d52e98a');

      //TODO : Change the userId to the actual userId
      const updateLastOpenFetch = async () => {
        try {
          await updateLastOpen(
            'd1c0d106-1a4a-4729-9033-1b2b2d52e98a',
            params.projectId,
          );
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
        <main className="w-full pl-15 pr-5 pt-[68px] space-y-5 h-min-[100vh] ">
          <Header>
            <Subtitle
              project={`${project.projectCode} ${project.name}`}
              projectId={params.projectId}
            />
          </Header>

          <MyDocumentData projectId={params.projectId} />
        </main>
      )}
    </>
  );
}
