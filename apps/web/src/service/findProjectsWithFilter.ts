import { trpc } from "../app/trpc";

export default async function findProjectsWithFilter(
  status: string,
  department: string
) {
  try {
    return await trpc.project.findProjectsWithFilter.query({
      status,
      department,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error filter projects");
  }
}
