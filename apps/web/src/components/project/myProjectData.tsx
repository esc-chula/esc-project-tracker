'use client';

import LastestPanel from './latestPanel';
import AllProjectPanel from './allProjectPanel';
import NoProject from './noProject';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Project, ProjectWithLastOpen } from '@/src/interface/project';
import { Filing } from '@/src/interface/filing';
import getProjectsByUserId from '@/src/service/getProjectsByUserId';
import SearchBar from '../searchbar/searchBar';
import getFilingsByUserId from '@/src/service/getFilingsByUserId';
import { useToast } from '../ui/use-toast';

export default function MyProjectData({
  compact = false,
  filingsData,
  projectsWithLastOpenData,
}: {
  compact?: boolean;
  filingsData?: Filing[];
  projectsWithLastOpenData?: ProjectWithLastOpen[];
}) {
  const { toast } = useToast();
  const router = useRouter();
  const redirectToProject = (project: Project | Filing) => {
    router.push(`/project/${project.id}`);
  };

  const [projectsWithLastOpen, setProjectsWithLastOpen] = useState<
    ProjectWithLastOpen[]
  >([]);
  const [filings, setFilings] = useState<Filing[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>(
    'd1c0d106-1a4a-4729-9033-1b2b2d52e98a',
  );

  //TODO : Change the userId to the actual userId
  useEffect(() => {
    const fetchProjects = async () => {
      if (userId) {
        try {
          const data = projectsWithLastOpenData?.length
            ? projectsWithLastOpenData
            : await getProjectsByUserId(userId);
          setProjectsWithLastOpen(data);
          setProjects(data.map((project) => project.project));
          setIsFetched(true);
        } catch (err) {
          if (err instanceof Error) {
            toast({
              title: 'ไม่สำเร็จ',
              description: err.message,
              isError: true,
            });
          }
        }
      }
    };
    const fetchFiling = async () => {
      //TODO : Change the userId to the actual userId
      if (userId) {
        try {
          const data = filingsData?.length
            ? filingsData
            : await getFilingsByUserId(userId);
          setFilings(data);
        } catch (err) {
          if (err instanceof Error) {
            toast({
              title: 'ไม่สำเร็จ',
              description: err.message,
              isError: true,
            });
          }
        }
      }
    };
    fetchProjects();
    fetchFiling();
  }, [projects]);

  return (
    <div className={compact ? 'w-full' : 'w-[65%]'}>
      <div className="mb-5">
        {!compact && (
          <SearchBar
            Filings={filings}
            projects={projects}
            placeholder="ค้นหาโครงการหรือเอกสาร"
            projectFunc={redirectToProject}
          />
        )}
      </div>
      {isFetched && (
        <>
          {projects.length === 0 ? (
            <NoProject />
          ) : (
            <>
              <LastestPanel
                projectsWithLastOpen={projectsWithLastOpen}
                compact={compact}
              />
              <AllProjectPanel
                projects={projects}
                userId={userId}
                setProjectsToParentFunc={(newProjects: Project[]) => {
                  setProjects(newProjects);
                }}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
