import { trpc } from '../../app/trpc';
import { DocumentType } from '../../interface/document';

export default async function findLatestPendingDocumentByFilingId(
  filingId: string,
): Promise<DocumentType | null> {
  try {
    const data = await trpc.document.findLatestPendingByFilingId.query({
      filingId,
    });
    return data;
  } catch (e) {
    console.log(e);
    throw new Error('Cant get latest Pending document');
  }
}
