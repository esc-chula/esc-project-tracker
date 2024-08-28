import type { Filing } from '../../interface/filing';
import { trpc } from '../../app/trpc';

export default async function getFilingByFilingId(
  filingId: string,
): Promise<Filing | null> {
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
