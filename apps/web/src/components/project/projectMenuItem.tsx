import { ProjectType } from "@/src/interface/project";
import { ProjectService } from "@/src/service/ProjectService";
import joinProject from "@/src/service/joinProject";

export default function ProjectMenuItem({
  project,
  index,
}: {
  project: ProjectType;
  index: number;
}) {
  // To do : check if user joined project by init another function to check
  // onClick function for join

  const handleJoinProject = async () => {
    try {
      await joinProject("@userId", "@projectId");
    } catch (e) {
      console.log(e);
      throw new Error("cannot join project");
    }
  };
  return (
    <div className="w-full grid grid-cols-7 border-b-2 border-gray-300">
      <div className="flex items-center text-center justify-center p-5 px-8">
        {index}
      </div>
      <div className="flex items-center text-center justify-center p-5 px-8">
        {project.projectCode}
      </div>
      <div className="col-span-3 flex items-center text-center justify-start p-5 pl-12 px-8">
        {project.name}
      </div>
      <div className="flex items-center text-center justify-center p-5 px-8">
        {project.status}
      </div>
      <div className="flex items-center text-center justify-center p-5 px-8">
        <button
          className="rounded-lg bg-red px-2 py-1 text-white hover:bg-white hover:text-red transition-all"
          onClick={handleJoinProject}
        >
          การเข้าร่วม
        </button>
      </div>
    </div>
  );
}
