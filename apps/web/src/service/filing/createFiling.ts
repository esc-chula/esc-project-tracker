import type { FilingSubType } from '@repo/shared';
import { trpc } from '../../app/trpc';
import type { Filing } from '../../interface/filing';

export default async function createFiling(
  projectId: string,
  filingName: string,
  filingType: number,
  userId: string,
  subType: FilingSubType | null,
  phoneNumber: string,
): Promise<Filing> {
  try {
    const data = await trpc.filing.createFiling.mutate({
      projectId,
      filingName,
      filingType,
      userId,
      subType,
      phoneNumber,
    });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error('ไม่สามารถสร้างเอกสารได้');
  }
}
