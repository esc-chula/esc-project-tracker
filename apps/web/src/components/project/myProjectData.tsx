'use client';

import LastestPanel from './latestPanel';
import AllProjectPanel from './allProjectPanel';
import NoProject from './noProject';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { Project, ProjectWithLastOpen } from '@/src/interface/project';
import { FilingType } from '@/src/interface/filing';
import getProjectsByUserId from '@/src/service/project/getProjectsByUserId';
import SearchBar from '../searchbar/searchBar';
import getFilingsByUserId from '@/src/service/filing/getFilingsByUserId';
import { useToast } from '../ui/use-toast';
import { getUserId } from '@/src/service/auth';
import React from 'react';

export default function MyProjectData({
  compact = false,
  filingsData,
  projectsWithLastOpenData,
}: {
  compact?: boolean;
  filingsData?: FilingType[];
  projectsWithLastOpenData?: ProjectWithLastOpen[];
}) {
  const { toast } = useToast();
  const router = useRouter();
  const redirectToProject = (project: Project | FilingType) => {
    router.push(`/project/${project.id}`);
  };
  const redirectToFiling = (filing: FilingType) => {
    router.push(`/project/${filing.projectId}/${filing.id}`);
  };

  const [projectsWithLastOpen, setProjectsWithLastOpen] = useState<
    ProjectWithLastOpen[]
  >([]);
  const [filings, setFilings] = useState<FilingType[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getUserId();
      setUserId(userId);
    };
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
    const fetchFilings = async () => {
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
    fetchUserId().then(() => {
      fetchProjects();
      fetchFilings();
    });
  }, []);

  return (
    <div className="w-full">
      <div className="mb-5">
        {!compact && (
          <SearchBar
            filings={filings}
            projects={projects}
            placeholder="ค้นหาโครงการหรือเอกสาร"
            projectFunc={redirectToProject}
            filingFunc={redirectToFiling}
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
                setProjects={setProjects}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
