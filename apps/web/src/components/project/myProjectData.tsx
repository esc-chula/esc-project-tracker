/* eslint-disable @typescript-eslint/no-shadow -- Necessary for compatibility with the existing codebase*/
'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import type { Project, ProjectWithLastOpen } from '@/src/interface/project';
import type { FilingType } from '@/src/interface/filing';
import getProjectsByUserId from '@/src/service/project/getProjectsByUserId';
import getFilingsByUserId from '@/src/service/filing/getFilingsByUserId';
import { getUserId } from '@/src/service/auth';
import SearchBar from '../searchbar/searchBar';
import { toast } from '../ui/use-toast';
import NoProject from './noProject';
import AllProjectPanel from './allProjectPanel';
import LastestPanel from './latestPanel';

export default function MyProjectData({
  compact = false,
  filingsData,
  projectsWithLastOpenData,
  showLastOpen = false,
}: {
  compact?: boolean;
  filingsData?: FilingType[];
  projectsWithLastOpenData?: ProjectWithLastOpen[];
  showLastOpen?: boolean;
}) {
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
      const userIdData = await getUserId();
      setUserId(userIdData);
      return userIdData;
    };
    const fetchProjects = async (userId: string) => {
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
    const fetchFilings = async (userId: string) => {
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
    void fetchUserId().then((userId) => {
      void fetchProjects(userId);
      void fetchFilings(userId);
    });
  }, []);

  return (
    <div className="w-full">
      {
        !compact && (
          <div className="mb-5">
            <SearchBar
              filings={filings}
              projects={projects}
              placeholder="ค้นหาโครงการหรือเอกสาร"
              projectFunc={redirectToProject}
              filingFunc={redirectToFiling}
            />
          </div>
        )}
      {isFetched ? (
        <>
          {projects.length === 0 ? (
            <NoProject />
          ) : (
            <>
              {
                showLastOpen ?
                  <LastestPanel
                    projectsWithLastOpen={projectsWithLastOpen}
                    compact={compact}
                  />
                : null
                }
              <AllProjectPanel
                projects={projects}
                userId={userId}
                setProjects={setProjects}
                showTitle={showLastOpen}
              />
            </>
          )}
        </>
      ) : null}
    </div>
  );
}
