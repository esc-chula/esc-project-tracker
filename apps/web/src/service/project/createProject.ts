import { trpc } from '../../app/trpc';
import type { ProjectType } from '@repo/shared';
import type { Project } from '../../interface/project';

export default async function createProject(
  name: string,
  type: ProjectType,
  owner: string,
  detail?: string,
): Promise<Project> {
  try {
    const data = await trpc.project.createProject.mutate({
      name,
      type,
      detail,
      owner,
    });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error('ไม่สามารถสร้างโครงการได้');
  }
}
