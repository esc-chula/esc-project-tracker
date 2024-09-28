import type { FilingType } from '../../interface/filing';
import { trpc } from '../../app/trpc';

export default async function findUserFilingOrderByLastOpen(
  userId: string,
  limit?: number,
): Promise<FilingType[]> {
  try {
    const filing = await trpc.filing.findUserFilingOrderByLastOpen.query({
      userId,
      limit,
    });
    return filing;
  } catch (err) {
    console.log(err);
    throw new Error('ไม่สามารถดึงข้อมูลเอกสารได้');
  }
}
