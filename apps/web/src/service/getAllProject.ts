import { trpc } from "../app/trpc";
import { ProjectType } from "../interface/project";

export function getAllProject(): Promise<ProjectType[]> {
  try {
    const data = trpc.getAllProject.query();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("failed");
  }
}
