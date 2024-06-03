import { trpc } from "../app/trpc";
import { ProjectType } from "../interface/project";

export function findAllProject(): Promise<ProjectType[]> {
  try {
    const data = trpc.findAllProject.query();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("failed");
  }
}
