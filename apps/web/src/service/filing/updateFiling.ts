import { trpc } from '../../app/trpc';
import type { FilingType } from '../../interface/filing';

export default async function updateFilingName({
  filingId,
  filingName,
}: {
  filingId: string;
  filingName: string;
}): Promise<FilingType | null> {
  try {
    const data = await trpc.filing.updateFilingName.query({
      filingId,
      filingName,
    });

    return data;
  } catch (e) {
    console.error(e);
    throw new Error('ไม่สามารถอัพเดทชื่อเอกสารได้');
  }
}
