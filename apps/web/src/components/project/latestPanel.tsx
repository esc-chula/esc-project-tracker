'use client';
import { useEffect, useState } from 'react';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import type { ProjectWithLastOpen } from '@/src/interface/project';
import type { UserFiling } from '@/src/interface/user-filing';
import LatestItem from './latestItem';
import 'react-indiana-drag-scroll/dist/style.css';

export default function LatestPanel({
  filingsWithLastOpen,
  projectsWithLastOpen,
  compact = false,
}: {
  filingsWithLastOpen?: UserFiling[];
  projectsWithLastOpen?: ProjectWithLastOpen[];
  compact?: boolean;
}) {
  const [isProject, setIsProject] = useState<boolean>(false);
  const [sortedProjects, setSortedProjects] = useState<ProjectWithLastOpen[]>(
    [],
  );

  const [sortedFilings, setSortedFilings] = useState<UserFiling[]>([]);

  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(true);
  useEffect(() => {
    const listenStorageChange = () => {
      if (localStorage.getItem('navbarExpanded') === null) setExpanded(true);
      else setExpanded(localStorage.getItem('navbarExpanded') === 'true');
    };
    window.addEventListener('storage', listenStorageChange);
    setExpanded(localStorage.getItem('navbarExpanded') === 'true');
    return () => {
      window.removeEventListener('storage', listenStorageChange);
    };
  }, []);

  useEffect(() => {
    if (projectsWithLastOpen) {
      setIsProject(true);
      const newSortedProjects = projectsWithLastOpen
        .filter((project) => project.lastOpen)
        .sort(
          (a, b) =>
            new Date(b.lastOpen).getTime() - new Date(a.lastOpen).getTime(),
        );

      setSortedProjects(newSortedProjects);
    }

    if (filingsWithLastOpen) {
      setIsProject(false);
      const newSortedFilings = filingsWithLastOpen
        .filter((filing) => filing.lastOpen)
        .sort(
          (a, b) =>
            new Date(b.lastOpen).getTime() - new Date(a.lastOpen).getTime(),
        );

      setSortedFilings(newSortedFilings);
    }
    setIsFetched(true);
  }, [projectsWithLastOpen, filingsWithLastOpen]);

  return (
    <div className={`flex flex-col w-${compact ? 'full' : '[60vw]'}`}>
      <div className="font-bold text-lg w-max">ล่าสุด</div>
      <ScrollContainer
        className={`bg-[#D9D9D9] bg-opacity-20 py-4 px-8 rounded-lg overflow-hidden max-w-[calc(100vw-${expanded ? 390 : 236}px)]`}
      >
        {isFetched ? (
          isProject ? (
            <div className="flex space-x-8">
              {sortedProjects.map((project) => (
                <LatestItem
                  key={project.project.id}
                  projectId={project.project.id}
                  projectCode={project.project.projectCode}
                  projectName={project.project.name}
                />
              ))}
            </div>
          ) : (
            <div className="flex space-x-8">
              {sortedFilings.map((filing) => (
                <LatestItem
                  key={filing.filing.id}
                  projectId={filing.filing.projectId}
                  projectCode={filing.filing.FilingCode}
                  projectName={filing.filing.name}
                  filingId={filing.filing.id}
                />
              ))}
            </div>
          )
        ) : null}
      </ScrollContainer>
    </div>
  );
}
