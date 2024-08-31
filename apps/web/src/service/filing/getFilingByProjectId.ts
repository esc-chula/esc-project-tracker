import type { FilingType } from '../../interface/filing';
import { trpc } from '../../app/trpc';

export default async function getFilingByProjectId({
  projectId,
}: {
  projectId: string;
}): Promise<FilingType[]> {
  try {
    const data = await trpc.filing.findFilingsByProjectId.query({ projectId });
    return data;
  } catch (err) {
    console.log(err);
    throw new Error('ไม่สามารถดึงข้อมูลเอกสารได้');
  }
}
