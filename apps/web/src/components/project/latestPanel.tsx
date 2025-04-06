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
    window.addEventListener('expandNavbar', listenStorageChange);
    setExpanded(localStorage.getItem('navbarExpanded') === 'true');
    return () => {
      window.removeEventListener('expandNavbar', listenStorageChange);
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
      <ScrollContainer
        // 206 = 110 (Sidebar) + 48 (Margin) + 48 (Padding)
        // 360 = 264 (Sidebar) + 48 (Margin) + 48 (Padding)
        className={`bg-opacity-20 rounded-lg overflow-hidden ${expanded ? 'w-[calc(100vw-360px)]' : 'w-[calc(100vw-206px)]'}`}
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
                  projectCode={filing.filing.filingCode}
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
