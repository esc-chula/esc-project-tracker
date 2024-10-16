import { FilingStatus } from '@/src/constant/enum';
import { trpc } from '../../app/trpc';
import type { FilingType } from '../../interface/filing';

export default async function updateFilingName({
  filingId,
  filingName,
  filingStatus,
}: {
  filingId: string;
  filingName?: string;
  filingStatus?: FilingStatus;
}): Promise<FilingType | null> {
  try {
    const data = await trpc.filing.updateFilingName.mutate({
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
