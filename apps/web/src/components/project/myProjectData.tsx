'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import type { Project, ProjectWithLastOpen } from '@/src/interface/project';
import type { Filing } from '@/src/interface/filing';
import SearchBar from '../searchbar/searchBar';
import NoProject from './noProject';
import AllProjectPanel from './allProjectPanel';
import LastestPanel from './latestPanel';

export default function MyProjectData({
  compact = false,
  filings = [],
  projects,
  projectsWithLastOpen,
  searchedProjectId = null,
  showLastOpen = false,
  userId,
  joinedProjects = new Set(),
}: {
  compact?: boolean;
  filings?: Filing[];
  projects: Project[];
  projectsWithLastOpen?: ProjectWithLastOpen[];
  searchedProjectId?: string | null;
  showLastOpen?: boolean;
  userId: string;
  joinedProjects?: Set<string>;
}) {
  const router = useRouter();
  const redirectToProject = (project: Project | Filing) => {
    router.push(`/project/${project.id}`);
  };
  const redirectToFiling = (filing: Filing) => {
    router.push(`/project/${filing.projectId}/${filing.id}`);
  };

  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  useEffect(() => {
    if (searchedProjectId) {
      setFilteredProjects(projects.filter((p) => p.id === searchedProjectId));
    } else {
      setFilteredProjects(projects);
    }
  }, [searchedProjectId, projects]);

  return (
    <div className="w-full">
      {!compact && (
        <div className="mb-5">
          <SearchBar
            filings={filings}
            projects={filteredProjects}
            placeholder="ค้นหาโครงการหรือเอกสาร"
            projectFunc={redirectToProject}
            filingFunc={redirectToFiling}
          />
        </div>
      )}
      {filteredProjects.length === 0 ? (
        <NoProject />
      ) : (
        <>
          {showLastOpen ? (
            <LastestPanel
              projectsWithLastOpen={projectsWithLastOpen}
              compact={compact}
            />
          ) : null}
          <AllProjectPanel
            projects={filteredProjects}
            userId={userId}
            setProjects={setFilteredProjects}
            showTitle={showLastOpen}
            joinedProjects={joinedProjects}
          />
        </>
      )}
    </div>
  );
}
