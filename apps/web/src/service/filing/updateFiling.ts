import { FilingStatus } from '@/src/constant/enum';
import { trpc } from '../../app/trpc';
import type { Filing } from '../../interface/filing';

export default async function updateFilingName({
  filingId,
  filingName,
  filingStatus,
}: {
  filingId: string;
  filingName?: string;
  filingStatus?: FilingStatus;
}): Promise<Filing | null> {
  try {
    const data = await trpc.filing.updateFilingName.query({
      filingId,
      filingName,
      filingStatus,
    });

    return data;
  } catch (e) {
    console.error(e);
    throw new Error('ไม่สามารถอัพเดทชื่อเอกสารได้');
  }
}
