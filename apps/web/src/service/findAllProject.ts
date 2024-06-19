import { trpc } from "../app/trpc";
import { Project } from "../interface/project";

export async function findAllProject(): Promise<Project[]> {
  try {
    const data = await trpc.project.findAllProject.query();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("failed");
  }
}
