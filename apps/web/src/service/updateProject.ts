import { trpc } from "../app/trpc";
import { ProjectStatus } from "../constant/enum";
import { Project } from "../interface/project";

export default async function updateProject({
projectId,
  name,
  detail,
  reserveDate,
  status
}: {
    projectId: string;
    name?: string;
    detail?: string;
    reserveDate?: Date;
    status?: ProjectStatus
}): Promise<Project | null> {
  try {
    const data = await trpc.project.updateProject.mutate({
        projectId,
      updatedProject : {
        name,
        detail,
        reserveDate,
        status
      },
    });

    return data;
  } catch (e) {
    console.error(e);
    throw new Error("ไม่สามารถอัพเดทโครงการได้");
  }
}