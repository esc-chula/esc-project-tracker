import AllProjectCard from './allProjectCard';

import { Project } from '@/src/interface/project';
import { filterProjectStatus } from '@/src/styles/enumMap';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { projectTypeMap } from '@/src/constant/map';
import SelectType from '../filter/selectType';

export default function AllProjectPanel({
  projects,
  userId,
  setProjects,
}: {
  projects: Project[];
  userId: string;
  setProjects: Dispatch<SetStateAction<Project[]>>;
}) {
  const [usedProjects, setUsedProjects] = useState<Project[]>(projects);
  const [projectState, setProjectState] = useState<string>('all');
  const [projectType, setProject] = useState<string>('all');

  useEffect(() => {
    if (projectState === 'all' && projectType === 'all') {
      setUsedProjects(projects);
    } else if (projectState === 'all') {
      setUsedProjects(
        projects.filter((project) => project.type.toString() === projectType),
      );
    } else if (projectType === 'all') {
      setUsedProjects(
        projects.filter((project) => project.status === projectState),
      );
    } else {
      setUsedProjects(
        projects.filter(
          (project) =>
            project.status === projectState &&
            project.type.toString() === projectType,
        ),
      );
    }
  }, [projectState, projectType, projects]);

  return (
    <div className="space-y-5 pt-5 pb-10 ">
      <div className="font-sukhumvit font-bold text-lg">ทั้งหมด</div>
      <div className="flex flex-row space-x-5">
        <SelectType
          title="สถานะ"
          items={filterProjectStatus}
          sendValue={(value) => {
            setProjectState(value);
          }}
        />
        <SelectType
          title="ประเภท"
          items={projectTypeMap}
          sendValue={(value) => {
            setProject(value);
          }}
        />
      </div>
      <div className="grid lg:grid-cols-4 md:grid-col-2 grid-row-2 gap-x-8 gap-y-10 ">
        {usedProjects.map((project) => (
          <AllProjectCard
            key={project.id}
            projectId={project.id}
            projectCode={project.projectCode}
            projectName={project.name}
            userId={userId}
            leaveThisProjectFunc={(id: string) => {
              setProjects((prevProjects: Project[]) =>
                prevProjects.filter((prevProject) => prevProject.id !== id),
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}
