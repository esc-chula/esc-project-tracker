import { trpc } from '../app/trpc';
import { User } from '../interface/user';

export async function findUserByCondition({
  id,
  username,
  studentId,
}: {
  id?: string;
  username?: string;
  studentId?: string;
}): Promise<User | null> {


  try {
    return await trpc.user.findUserByCondition.query({
      id,
      username,
      studentId,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error find user by condition');
  }
}
