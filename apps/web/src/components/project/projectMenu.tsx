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
import { mockProject } from "@/src/mock/data";
import { useToast } from "../ui/use-toast";
import { findAllProject } from "@/src/service/findAllProject";
import findProjectWithFilter from "@/src/service/findProjectWithFilter";

export default function ProjectMenu() {
  const { toast } = useToast();
  const [departmentProject, setDepartmentProject] =
    React.useState<string>("ALL");
  const [statusProject, setStatusProject] = React.useState<string>("ALL");
  const [typeProject, setTypeProject] = React.useState<string>("ALL");
  const [projects, setProjects] = React.useState<Project[]>([]);

  async function fetchData() {
    try {
      if (
        departmentProject === "ALL" &&
        statusProject === "ALL" &&
        typeProject === "ALL"
      ) {
        const fetchedProject = await findAllProject();
        if (fetchedProject) {
          setProjects(fetchedProject);
        }
      } else {
        const fetchedProject = await findProjectWithFilter(
          statusProject,
          departmentProject
        );
        if (fetchedProject) {
          setProjects(fetchedProject);
        }
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

  // if (!projects || !projects.length) {
  //   return (
  //     <NoData firstLine="ยังไม่มีโครงการ" secondLine="เริ่มเปิดโครงกันเลย !" />
  //   );
  // }

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
            { value: "join", label: "ทั้งหมด" },
            { value: "notjoin", label: "ทั้งหมด" },
          ]}
          sendValue={setTypeProject}
        />
      </div>
      {!projects || !projects.length ? (
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
