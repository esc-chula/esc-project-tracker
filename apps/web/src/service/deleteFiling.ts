import { trpc } from "../app/trpc";
import { FilingType } from "../interface/filing";

export default async function deleteFiling(
  filingId: string
): Promise<FilingType | null> {
  const data = await trpc.deleteFiling.query({
    filingId: "acasc",
  });

  if (data) {
    return data;
  }

  throw new Error("Failed to delete filing");
}
