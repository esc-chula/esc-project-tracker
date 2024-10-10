import { trpc } from '../../app/trpc';

export default async function userOpenFiling(userId: string, filingId: string) {
  try {
    await trpc.userFiling.userOpenFiling.mutate({
      userId,
      filingId,
    });
  } catch (err) {
    console.error(err);
    throw new Error('ไม่สามารถอัพเดทข้อมูลการเปิดเอกสารได้');
  }
}
