import { trpc } from '../../app/trpc';

export default async function updateFileLastOpen(
  documentId: string,
  fileType: string,
) {
  try {
    await trpc.document.updateFileLastOpen.mutate({
      id: documentId,
      fileType,
    });
  } catch (err) {
    console.error(err);
    throw new Error('ไม่สามารถอัพเดทข้อมูลได้การเข้าโปรเจคได้');
  }
}
