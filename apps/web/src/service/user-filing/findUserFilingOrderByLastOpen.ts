import { trpc } from '../../app/trpc';
import { UserFiling } from '../../interface/user-filing';

export default async function findUserFilingOrderByLastOpen(userId: string, limit?: number): Promise<UserFiling[]> {
  try {
    return await trpc.userFiling.findUserFilingOrderByLastOpen.query({
      userId,
      limit,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error when finding user filing order by last open');
  }
}