import { trpc } from "../app/trpc";

export default async function joinProjectByStudentId(studentId: string, projectId: string) {
  try {
    return await trpc.userProj.joinProjectByStudentId.query({
        studentId,
        projectId,
    })
  } catch (err) {
    console.error(err);
    throw new Error("ไม่สามารถเข้าร่วมโปรเจคโดยใช้รหัสนิสิตนี้ได้");
  }
}
