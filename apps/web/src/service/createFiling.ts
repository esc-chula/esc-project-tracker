import { trpc } from "../app/trpc";
import type { Filing } from "../interface/filing";

export default async function createFiling(
  projectId: string,
  filingName: string,
  filingType: number
): Promise<Filing> {
  try {
    const data = await trpc.filing.createFiling.query({
      projectId,
      filingName,
      filingType,
    });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("ไม่สามารถสร้างเอกสารได้");
  }
}
