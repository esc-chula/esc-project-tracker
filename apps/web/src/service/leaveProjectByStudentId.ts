import { trpc } from '../app/trpc';

export default async function leaveProjectByStudentId(
  studentId: string,
  projectId: string,
) {
  try {
    return await trpc.userProj.leaveProjectByStudentId.mutate({
      studentId,
      projectId,
    });
  } catch (err) {
    console.error(err);
    throw new Error('ไม่สามารถออกจากโปรเจคโดบใช้รหัสนิสิตนี้ได้');
  }
}
