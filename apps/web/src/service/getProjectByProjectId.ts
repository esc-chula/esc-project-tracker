import { trpc } from "../app/trpc";
import { ProjectType } from "../interface/project";

export default async function getProjectByProjectId(
  projectId: string
): Promise<ProjectType> {
  try {
    const project = await trpc.getProjectByProjectId.query({ projectId });
    return project;
  } catch (err) {
    alert(err);
    return null;
  }
}
