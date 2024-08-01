import { trpc } from '../app/trpc';
import { User } from '../interface/user';

export async function findUserByCondition(
  id?: string,
  name?: string,
  studentId?: string,
): Promise<User | null> {
  try {
    return await trpc.user.findUserByCondition.query({
      id,
      name,
      studentId,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error file user by condition');
  }
}
