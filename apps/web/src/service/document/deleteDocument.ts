import { trpc } from '../../app/trpc';
import type { Document } from '../../interface/document';

export default async function deleteDocument(
  documentId: string,
): Promise<Document | null> {
  try {
    const data = await trpc.document.deleteDocument.mutate({ id: documentId });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error('ไม่สามารถลบเอกสารฉบับร่างได้');
  }
}
