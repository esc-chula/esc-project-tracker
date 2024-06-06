import { trpc } from "../app/trpc";

export default async function joinProject(userId: string, projectId: string) {
  try {
    const data = await trpc.createUserProject.query({
      userId,
      projectId,
    });
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("ไม่สามารถเข้าร่วมโปรเจคได้");
  }
}
