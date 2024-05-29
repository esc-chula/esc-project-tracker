import { trpc } from "../app/trpc";
import { FilingType } from "../interface/filing";

export default async function updateFilingName(
  filingId: string,
  filingName: string
): Promise<FilingType | null> {
  try {
    const data = await trpc.updateFilingName.query({
      filingId,
      filingName,
    });

    return data;
  } catch (e) {
    alert(e);
    return null;
  }
}
