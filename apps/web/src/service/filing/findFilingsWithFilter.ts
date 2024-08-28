import { trpc } from '../../app/trpc';

export default async function findFilingsWithFilter(
  status: string,
  type: string,
  department: string,
  id?: string,
) {
  try {
    return await trpc.filing.findFilingsWithFilter.query({
      status,
      type,
      department,
      id,
    });
  } catch (error) {
    console.log(error);
  }
}
