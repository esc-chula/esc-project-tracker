import { trpc } from "../app/trpc";

export default async function findAllFiling() {
  try {
    const data = await trpc.filing.findAllFiling.query();
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to fetch filing");
  }
}
