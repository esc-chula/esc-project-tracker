import { trpc } from "../app/trpc";
import type { Project } from "../interface/project";

export default async function getProjectByProjectId(
  projectId: string | null
): Promise<Project | null> {
  try {
    if (!projectId) {
      return null;
    }
    const project = await trpc.project.getProjectByProjectId.query({
      projectId,
    });
    return project;
  } catch (err) {
    console.error(err);
    throw new Error("ไม่สามารถดึงข้อมูลโปรเจคได้");
  }
}
