import { trpc } from '../../app/trpc';

export default async function updateLastOpen(
  userId: string,
  projectId: string,
) {
  try {
    await trpc.userProj.updateUserProjLastOpen.query({
      userId,
      projectId,
    });
  } catch (err) {
    console.error(err);
    throw new Error('ไม่สามารถอัพเดทข้อมูลได้การเข้าโปรเจคได้');
  }
}
