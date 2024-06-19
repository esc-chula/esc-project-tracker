import { trpc } from "../app/trpc";

export default async function checkByUserIDAndProjectID(
  userId: string,
  projectId: string
): Promise<boolean> {
  try {
    const result = await trpc.userProj.checkByUserIDAndProjectID.query({
      userId,
      projectId,
    });
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to check If user've joined project");
  }
}
