import type { FilingType } from '../../interface/filing';
import { trpc } from '../../app/trpc';

export default async function getFilingByFilingId(
  filingId: string,
): Promise<FilingType | null> {
  try {
    const data = await trpc.filing.findFilingByFilingId.query({ filingId });
    if (!data) {
      return null;
    }
    return data;
  } catch (err) {
    console.log(err);
    throw new Error('ไม่สามารถดึงข้อมูลเอกสารได้');
  }
}
