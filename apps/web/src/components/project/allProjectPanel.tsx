import AllProjectCard from "./allProjectCard";
import SelectType from "./selectType";
import { Project } from "@/src/interface/project";
import { filterProjectStatus } from "@/src/styles/enumMap";
import { useState, useEffect } from "react";
import { projectTypeMap } from "@/src/constant/Map";

export default function AllProjectPanel({
  projects,
  userId,
  setProjectsToParentFunc,
}: {
  projects: Project[];
  userId: string;
  setProjectsToParentFunc: (projects: Project[]) => void;
}) {
  const [allProjects, setAllProjects] = useState<Project[]>(projects);
  const [usedProjects, setUsedProjects] = useState<Project[]>(projects);
  const [projectState, setProjectState] = useState<string>("all");
  const [projectType, setProject] = useState<string>("all");

  useEffect(() => {
    if (projectState === "all" && projectType === "all") {
      setUsedProjects(allProjects);
    } else if (projectState === "all") {
      setUsedProjects(
        allProjects.filter((project) => project.type.toString() === projectType)
      );
    } else if (projectType === "all") {
      setUsedProjects(
        allProjects.filter((project) => project.status === projectState)
      );
    } else {
      setUsedProjects(
        allProjects.filter(
          (project) =>
            project.status === projectState &&
            project.type.toString() === projectType
        )
      );
    }
  }, [projectState, projectType, allProjects, projects]);

  useEffect(() => {
    setAllProjects(projects);
  }, [projects]);

  useEffect(() => {
    setProjectsToParentFunc(allProjects);
  }, [allProjects]);

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
              setAllProjects((prevProjecs) =>
                prevProjecs.filter((project) => project.id !== id)
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}
