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

export default function ProjectMenu() {
  const { toast } = useToast();
  const [departmentProject, setDepartmentProject] = React.useState<String>("");
  const [statusProject, setStatusProject] = React.useState<String>("");
  const [typeProject, setTypeProject] = React.useState<String>("");
  const [projects, setProjects] = React.useState<Project[]>([]);

  async function fetchData() {
    try {
      // if (
      //   departmentProject === "" &&
      //   statusProject === "" &&
      //   typeProject === ""
      // ) {
      //   const fetchedProject = await findAllProject();
      // } else {
      //   const fetchedProject = await findProjectWithFilter({
      //     department: departmentProject,
      //     status: statusProject,
      //     type: typeProject,
      //   });
      // }
      // use when have mocked data in DB
      const fetchedProject = mockProject;
      if (fetchedProject) {
        setProjects(fetchedProject);
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

  if (!projects || !projects.length) {
    return (
      <NoData firstLine="ยังไม่มีโครงการ" secondLine="เริ่มเปิดโครงกันเลย !" />
    );
  }

  return (
    <div className="">
      <div className="w-1/4 grid grid-cols-3 gap-6 mb-5">
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
            { value: "all", label: "ทั้งหมด" },
            { value: "join", label: "ทั้งหมด" },
            { value: "notjoin", label: "ทั้งหมด" },
          ]}
          sendValue={setTypeProject}
        />
      </div>
      <div className="w-full overflow-x-scroll rounded-t-xl">
        <table className="w-full border-collapse border-spacing-0 overflow-hidden">
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
    </div>
  );
}
