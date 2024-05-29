import { trpc } from "../app/trpc";
import { FilingType } from "../interface/filing";

export default async function createFiling(
  projectId: string,
  filingName: string,
  filingType: number
): Promise<FilingType | null> {
  console.log(projectId, filingName, filingType);
  console.log("TEST HI");
  try {
    const data = await trpc.createFiling.query({
      projectId,
      filingName,
      filingType,
    });

    return data;
  } catch (err) {
    alert(err);
    return null;
  }
}
