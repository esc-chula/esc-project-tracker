import { trpc } from "../app/trpc";
import { ProjectType } from "../interface/project";

export async function findAllProject(): Promise<ProjectType[]> {
  try {
    const data = await trpc.findAllProject.query();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("failed");
  }
}
