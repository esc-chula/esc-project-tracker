import { trpc } from '../../app/trpc';

export default async function findJoinedProjectsByUserId(
  userId: string,
): Promise<string[]> {
  try {
    return await trpc.userProj.findJoinedProjectsByUserId.query({
      userId,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error when finding joined projects by user id');
  }
}
