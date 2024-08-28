import type { Filing } from '../../interface/filing';
import { trpc } from '../../app/trpc';

export default async function getFilingsByUserId(
  userId: string,
): Promise<Filing[]> {
  try {
    const data = await trpc.filing.findFilingsByUserId.query({ userId });
    return data;
  } catch (err) {
    console.error(err);
    throw new Error('ไม่สามารถดึงข้อมูลเอกสารได้');
  }
}
