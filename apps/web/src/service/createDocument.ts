import { DocumentActivity, DocumentStatus } from '@/src/constant/enum';
import { trpc } from '../app/trpc';
import { Document } from '../interface/document';

export default async function createDocument(
  name: string,
  filingId: string,
  pdfName: string,
  docName: string,
  activity: DocumentActivity,
  userId: string,
  detail?: string,
  status?: DocumentStatus,
): Promise<Document> {
  try {
    const data = await trpc.document.createDocument.mutate({
      name,
      filingId,
      pdfName,
      docName,
      activity,
      userId,
      detail,
      status,
    });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error('ไม่สามารถสร้างฉบับร่างของเอกสารได้');
  }
}
