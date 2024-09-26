"use client";
import { ProjectWithLastOpen } from "@/src/interface/project";
import LatestItem from "./latestItem";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { useEffect, useState } from "react";

export default function LastestPanel({
  projectsWithLastOpen,
  compact=false
}: {
  projectsWithLastOpen: ProjectWithLastOpen[];
  compact?:boolean
}) {
  const [carouselRef] = useEmblaCarousel({ loop: false, dragFree: true }, [
    WheelGesturesPlugin(),
  ]);
  const [sortedProjects, setSortedProjects] = useState<ProjectWithLastOpen[]>(
    []
  );
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    const newSortedProjects = projectsWithLastOpen
    .filter(project => project.lastOpen !== '') 
    .sort((a, b) => new Date(b.lastOpen).getTime() - new Date(a.lastOpen).getTime());
    
    setSortedProjects(newSortedProjects);
    setIsFetched(true);
  }, [projectsWithLastOpen]);

  return (
    <div className={`flex flex-col max-w-${compact?'[100vw]':'[60vw]'}`}>
      <div className="font-sukhumvit font-bold text-lg">ล่าสุด</div>
      <div
        className="bg-[#D9D9D9] bg-opacity-20 py-4 px-8 rounded-lg overflow-hidden"
        ref={carouselRef}
      >
        {isFetched && (
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
        )}
      </div>
    </div>
  );
}
