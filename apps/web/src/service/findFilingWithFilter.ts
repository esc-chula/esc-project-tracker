import { trpc } from "../app/trpc";

export default async function findFilingWithFilter(
  status: string,
  type: string,
  department: string
) {
  try {
    return await trpc.filing.findFilingWithFilter.query({
      status,
      type,
      department,
    });
  } catch (error) {
    console.log(error);
  }
}
