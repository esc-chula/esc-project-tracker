import { trpc } from "../app/trpc";
import { FilingStatus } from "../constant/enum";
import { FilingType } from "../interface/filing";

export default async function updateFilingName({
  filingId,
  filingName,
  filingStatus,
}: {
  filingId: string;
  filingName: string;
  filingStatus?: FilingStatus;
}): Promise<FilingType | null> {
  try {
    const data = await trpc.filing.updateFilingName.query({
      filingId,
      filingName,
    });

    return data;
  } catch (e) {
    console.error(e);
    throw new Error("ไม่สามารถอัพเดทชื่อเอกสารได้");
  }
}
