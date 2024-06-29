import { trpc } from "../app/trpc";

export default async function findFilingsWithFilter(
  status: string,
  type: string,
  department: string
) {
  try {
    return await trpc.filing.findFilingsWithFilter.query({
      status,
      type,
      department,
    });
  } catch (error) {
    console.log(error);
  }
}
