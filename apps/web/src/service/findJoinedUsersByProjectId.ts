import { trpc } from '../app/trpc';

export default async function findJoinedUsersByProjectId(projectId: string) {
  try {
    return await trpc.userProj.findJoinedUsersByProjectId.query({
      projectId,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error when finding joined users by project id');
  }
}
