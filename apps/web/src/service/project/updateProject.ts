import { trpc } from '../../app/trpc';
import { ProjectStatus, ProjectType } from '../../constant/enum';
import { Project } from '../../interface/project';

export default async function updateProject({
  projectId,
  name,
  detail,
  reserveDate,
  status,
  type,
}: {
  projectId: string;
  name?: string;
  detail?: string;
  reserveDate?: Date;
  status?: ProjectStatus;
  type?: ProjectType;
}): Promise<Project | null> {
  try {
    const data = await trpc.project.updateProject.mutate({
      projectId,
      updatedProject: {
        name,
        detail,
        reserveDate,
        status,
        type,
      },
    });

    return data;
  } catch (e) {
    console.error(e);
    throw new Error('ไม่สามารถอัพเดทโครงการได้');
  }
}
