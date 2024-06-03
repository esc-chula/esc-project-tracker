import { ProjectType } from "@/src/interface/project";
import ProjectMenuHeader from "./projectMenuHeader";
import NoData from "../all-projects/noData";
import ProjectMenuItem from "./projectMenuItem";

export default function ProjectMenu({ projects }: { projects: ProjectType[] }) {
  if (!projects || !projects.length) {
    return (
      <NoData firstLine="ยังไม่มีโครงการ" secondLine="เริ่มเปิดโครงกันเลย !" />
    );
  }
  return (
    <div className="w-full overflow-scroll">
      <ProjectMenuHeader />
      {projects.map((proj, index) => (
        <ProjectMenuItem project={proj} key={proj.id} index={index + 1} />
      ))}
    </div>
  );
}
