import { trpc } from '../../app/trpc';
import { Document } from '../../interface/document';

export default async function findLatestPendingDocumentByFilingId(
  filingId: string,
): Promise<Document | null> {
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
