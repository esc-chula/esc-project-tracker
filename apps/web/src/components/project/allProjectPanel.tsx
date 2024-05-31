import AllProjectCard from "./allProjectCard";
import SelectType from "./selectType";
import { ProjectType } from "@/src/interface/project";
import { filterProjectStatus } from "@/src/styles/enumMap";
import { useState, useEffect } from "react";
import { projectTypeMap } from "@/src/constant/type";

export default function AllProjectPanel({
  projects,
}: {
  projects: ProjectType[];
}) {
  const [usedProjects, setUsedProjects] = useState<ProjectType[]>(projects);
  const [projectState, setProjectState] = useState<string>("all");
  const [projectType, setProjectType] = useState<string>("all");

  useEffect(() => {
    if (projectState === "all" && projectType === "all") {
      setUsedProjects(projects);
    } else if (projectState === "all") {
      setUsedProjects(
        projects.filter((project) => project.type.toString() === projectType)
      );
    } else if (projectType === "all") {
      setUsedProjects(
        projects.filter((project) => project.status === projectState)
      );
    } else {
      setUsedProjects(
        projects.filter(
          (project) =>
            project.status === projectState &&
            project.type.toString() === projectType
        )
      );
    }
  }, [projectState, projectType]);

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
            setProjectType(value);
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
          />
        ))}
      </div>
    </div>
  );
}
