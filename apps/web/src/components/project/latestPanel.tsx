'use client';
import { ProjectWithLastOpen } from '@/src/interface/project';
import LatestItem from './latestItem';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { useEffect, useState } from 'react';
import { UserFiling } from '@/src/interface/user-filing';
import { set } from 'zod';
import { FilingType } from '@/src/interface/filing';

export default function LatestPanel({
  filingsWithLastOpen,
  projectsWithLastOpen,
  compact = false,
}: {
  filingsWithLastOpen?: UserFiling[];
  projectsWithLastOpen?: ProjectWithLastOpen[];
  compact?: boolean;
}) {
  const [carouselRef] = useEmblaCarousel({ loop: false, dragFree: true }, [
    WheelGesturesPlugin(),
  ]);

  const [isProject, setIsProject] = useState<boolean>(false);
  const [sortedProjects, setSortedProjects] = useState<ProjectWithLastOpen[]>(
    [],
  );

  const [sortedFilings, setSortedFilings] = useState<UserFiling[]>([]);

  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    if (projectsWithLastOpen) {
      setIsProject(true);
      const newSortedProjects = projectsWithLastOpen
        .filter((project) => project.lastOpen !== null)
        .sort(
          (a, b) =>
            new Date(b.lastOpen).getTime() - new Date(a.lastOpen).getTime(),
        );

      setSortedProjects(newSortedProjects);
    }

    if (filingsWithLastOpen) {
      setIsProject(false);
      const newSortedFilings = filingsWithLastOpen
        .filter((filing) => filing.lastOpen !== null)
        .sort(
          (a, b) =>
            new Date(b.lastOpen).getTime() - new Date(a.lastOpen).getTime(),
        );

      setSortedFilings(newSortedFilings);
    }
    setIsFetched(true);
  }, [projectsWithLastOpen, filingsWithLastOpen]);

  return (
    <div className={`flex flex-col max-w-${compact ? '[100vw]' : '[60vw]'}`}>
      <div className="font-sukhumvit font-bold text-lg">ล่าสุด</div>
      <div
        className="bg-[#D9D9D9] bg-opacity-20 py-4 px-8 rounded-lg overflow-hidden"
        ref={carouselRef}
      >
        {isFetched &&
          (isProject ? (
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
          ))}
      </div>
    </div>
  );
}
