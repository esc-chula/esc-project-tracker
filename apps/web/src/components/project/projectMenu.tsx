import { Project } from "@/src/interface/project";
import ProjectMenuHeader from "./projectMenuHeader";
import NoData from "../all-projects/noData";
import ProjectMenuItem from "./projectMenuItem";
import SelectType from "../filter/selectType";
import React from "react";
import {
  statusProjectItems,
  typeProjectItems,
} from "@/src/constant/filterProject";
import { mockProject } from "@/src/mock/data";

export default function ProjectMenu() {
  const [departmentProject, setDepartmentProject] = React.useState<String>("");
  const [statusProject, setStatusProject] = React.useState<String>("");
  const [typeProject, setTypeProject] = React.useState<String>("");
  const [projects, setProjects] = React.useState<Project[]>([]);

  React.useEffect(() => {
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
        console.log(error);
        throw new Error("Failed to fetch data");
      }
    }

    fetchData();
  }, [departmentProject, statusProject, typeProject]);

  if (!projects || !projects.length) {
    return (
      <NoData firstLine="ยังไม่มีโครงการ" secondLine="เริ่มเปิดโครงกันเลย !" />
    );
  }

  return (
    <div className="w-full">
      <div className="w-1/4 grid grid-cols-3 gap-6 mb-5">
        <SelectType
          title="ฝ่าย"
          items={[{ value: "test", label: "test" }]}
          sendValue={setDepartmentProject}
        />
        <SelectType
          title="สถานะ"
          items={statusProjectItems}
          sendValue={setStatusProject}
        />
        <SelectType
          title="ประเภท"
          items={typeProjectItems}
          sendValue={setTypeProject}
        />
      </div>
      <div className="w-full overflow-scroll">
        <ProjectMenuHeader />
        {projects.map((project, index) => (
          <ProjectMenuItem
            project={project}
            key={project.id}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
