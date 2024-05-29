import { trpc } from "../app/trpc";

export default async function createFiling(
  projectId: string,
  filingName: string,
  filingType: number
): Promise<boolean> {
  console.log(projectId, filingName, filingType);
  console.log("TEST HI");
  try {
    const data = await trpc.createFiling.query({
      projectId,
      filingName,
      filingType,
    });
    return true;
  } catch (err) {
    alert(err);
    return false;
  }
}
