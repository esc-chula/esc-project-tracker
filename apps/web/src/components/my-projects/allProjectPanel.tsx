import { MockProject } from "@/src/mock/type";
import AllProjectCard from "./allProjectCard";
import SelectType from "./selectType";
import { ProjectType } from "@/src/interface/project";

export default function AllProjectPanel({
  projects,
}: {
  projects: ProjectType[];
}) {
  return (
    <div className="space-y-5 pt-5 pb-10 ">
      <div className="font-sukhumvit font-bold text-lg">ทั้งหมด</div>
      <div className="flex flex-row space-x-5">
        {/*<SelectType title="ประเภท" />
        <SelectType title="บุคคล" />
        <SelectType title="ทั้งหมด" />*/}
      </div>
      <div className="grid lg:grid-cols-4 md:grid-col-2 max-w-[50vw] grid-row-2 gap-x-8 gap-y-10 ">
        {projects.map((project) => (
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
