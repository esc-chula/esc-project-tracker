import { trpc } from '../../app/trpc';
import { ProjectWithLastOpen } from '../../interface/project';

export default async function findAllProject(): Promise<ProjectWithLastOpen[]> {
  try {
    const data = await trpc.project.findAllProject.query();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error('failed');
  }
}
