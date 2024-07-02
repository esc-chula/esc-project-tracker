import { trpc } from "../app/trpc";
import type { FilingType } from "../interface/filing";

export default async function deleteFiling(
  filingId: string
): Promise<FilingType | null> {
  try {
    const data = await trpc.filing.deleteFiling.query({ filingId });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("ไม่สามารถลบเอกสารได้");
  }
}
