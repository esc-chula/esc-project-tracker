import type { FilingType } from '../../interface/filing';
import { trpc } from '../../app/trpc';

export default async function getFilingByFilingId(
  filingId: string,
): Promise<FilingType | null> {
  try {
    const filing = await trpc.filing.getFilingByFilingId.query({
      filingId,
    });
    return filing;
  } catch (err) {
    console.log(err);
    throw new Error('ไม่สามารถดึงข้อมูลเอกสารได้');
  }
}
