import { trpc } from "../app/trpc";
import { Project } from "../interface/project";

export default async function getProjectByProjectId(
  projectId: string
): Promise<Project | null> {
  try {
    const project = await trpc.project.getProjectByProjectId.query({
      projectId,
    });
    return project;
  } catch (err) {
    console.error(err);
    throw new Error("ไม่สามารถดึงข้อมูลโปรเจคได้");
  }
}
