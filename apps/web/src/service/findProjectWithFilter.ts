import { trpc } from "../app/trpc";

export default async function findProjectWithFilter(
  status: string,
  department: string
) {
  try {
    return await trpc.project.findProjectWithFilter.query({
      status,
      department,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error filter projects");
  }
}
