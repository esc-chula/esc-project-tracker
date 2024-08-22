import { trpc } from '../app/trpc';
import { User } from '../interface/user';

export async function findUserByUserId(userId: string): Promise<User | null> {
  try {
    return await trpc.user.findUserByUserId.query({
      userId,
    });
  } catch (err) {
    console.error('findUserByUserId error: ', err);
    throw new Error('ไม่สามารถดึงข้อมูลผู้ใช้ได้');
  }
}
