import type { FilingSubType } from '@repo/shared';
import type { Gendoc } from '@/src/interface/gendoc';
import { trpc } from '../../app/trpc';

export default async function createGendoc(
  customProjectName: string,
  name: string,
  type: number,
  userId: string,
  filingCode: string,
  subType: FilingSubType | null,
  projectCode: string,
  projectId?: string,
): Promise<Gendoc> {
  try {
    const data = await trpc.gendoc.createGendoc.mutate({
      customProjectName,
      name,
      type,
      userId,
      filingCode,
      subType,
      projectCode,
      projectId,
    });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error('ไม่สามารถสร้างเอกสารได้');
  }
}
