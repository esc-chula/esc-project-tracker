import { Project } from "@/src/interface/project";
import ProjectMenuHeader from "./projectMenuHeader";
import NoData from "../all-projects/noData";
import ProjectMenuItem from "./projectMenuItem";

export default function ProjectMenu({ projects }: { projects: Project[] }) {
  if (!projects || !projects.length) {
    return (
      <NoData firstLine="ยังไม่มีโครงการ" secondLine="เริ่มเปิดโครงกันเลย !" />
    );
  }
  return (
    <div className="w-full overflow-scroll">
      <ProjectMenuHeader />
      {projects.map((project, index) => (
        <ProjectMenuItem project={project} key={project.id} index={index + 1} />
      ))}
    </div>
  );
}
