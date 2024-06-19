import { Project } from "@/src/interface/project";
import ProjectMenuHeader from "./projectMenuHeader";
import NoData from "../all-projects/noData";
import ProjectMenuItem from "./projectMenuItem";
import SelectType from "../filter/selectType";
import React from "react";
import {
  departmentProjectItems,
  statusProjectItems,
} from "@/src/constant/filterProject";
import { useToast } from "../ui/use-toast";
import { findAllProject } from "@/src/service/findAllProject";
import findProjectWithFilter from "@/src/service/findProjectWithFilter";
import checkByUserIDAndProjectID from "@/src/service/checkUserProject";

export default function ProjectMenu() {
  const { toast } = useToast();
  const [departmentProject, setDepartmentProject] =
    React.useState<string>("ALL");
  const [statusProject, setStatusProject] = React.useState<string>("ALL");
  const [typeProject, setTypeProject] = React.useState<string>("ALL");
  const [projects, setProjects] = React.useState<Project[]>([]);

  async function filterJoin(eachProject: Project): Promise<boolean> {
    const result = await checkByUserIDAndProjectID(
      "c8b285e0-9653-40d5-9865-def3b4792c99",
      eachProject.id
    );
    console.log(result);
    return result;
  }
  async function fetchData() {
    try {
      let fetchedProject: Project[];
      if (departmentProject === "ALL" && statusProject === "ALL") {
        fetchedProject = await findAllProject();
      } else {
        fetchedProject = await findProjectWithFilter(
          statusProject,
          departmentProject
        );
      }

      if (typeProject === "ALL") {
        setProjects(fetchedProject);
      } else {
        const filteredProjects = await Promise.all(
          fetchedProject.map(async (project) => {
            const isJoined = await filterJoin(project);
            if (typeProject === "join") {
              return isJoined ? project : null;
            } else {
              return isJoined ? null : project;
            }
          })
        );
        setProjects(
          filteredProjects.filter(
            (project): project is Project => project !== null
          )
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "ไม่สำเร็จ",
          description: error.message,
          isError: true,
        });
      }
    }
  }
  React.useEffect(() => {
    fetchData();
  }, [departmentProject, statusProject, typeProject]);

  return (
    <div className="w-full">
      <div className="w-1/3 lg:w-1/4 grid grid-cols-3 gap-6 mb-5">
        <SelectType
          title="ฝ่าย"
          items={departmentProjectItems}
          sendValue={setDepartmentProject}
        />
        <SelectType
          title="สถานะ"
          items={statusProjectItems}
          sendValue={setStatusProject}
        />
        <SelectType
          title="ทั้งหมด"
          items={[
            { value: "ALL", label: "ทั้งหมด" },
            { value: "join", label: "เข้าร่วม" },
            { value: "notjoin", label: "ไม่ได้เข้าร่วม" },
          ]}
          sendValue={setTypeProject}
        />
      </div>
      {!projects.length ? (
        <NoData
          firstLine="ยังไม่มีโครงการ"
          secondLine="เริ่มเปิดโครงกันเลย !"
        />
      ) : (
        <div className="w-full h-[500px] overflow-x-auto overflow-y-auto rounded-t-xl">
          <table className="w-full">
            <ProjectMenuHeader />
            {projects.map((project, index) => (
              <ProjectMenuItem
                project={project}
                key={project.id}
                index={index + 1}
              />
            ))}
          </table>
        </div>
      )}
    </div>
  );
}
