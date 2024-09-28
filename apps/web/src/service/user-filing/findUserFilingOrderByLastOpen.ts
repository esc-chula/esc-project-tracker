import { trpc } from '../../app/trpc';
import { UserFiling } from '../../interface/user-filing';

export default async function findUserFilingOrderByLastOpen(
  userId: string,
  limit?: number,
): Promise<UserFiling[]> {
  try {
    const userFiling = await trpc.userFiling.findUserFilingOrderByLastOpen.query({
      userId,
      limit,
    });
    return userFiling;
  } catch (error) {
    console.error(error);
    throw new Error('Error when finding user filing by last open');
  }
}
