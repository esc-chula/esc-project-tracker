import { trpc } from "../app/trpc";

export default async function leaveProject(userId: string, projectId: string) {
  try {
    const data = await trpc.userProj.deleteUserProject.query({
      userId,
      projectId,
    });
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("ไม่สามารถออกจากโปรเจคได้");
  }
}
