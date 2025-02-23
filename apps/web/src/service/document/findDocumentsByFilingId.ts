import { trpc } from '../../app/trpc';
import { Document } from '../../interface/document';
export default async function findDocumentsByFilingId(
  filingId: string,
): Promise<Document[]> {
  try {
    const data = await trpc.document.findDocumentsByFilingId.query({
      filingId,
    });
    return data;
  } catch (e) {
    console.log(e);
    throw new Error('Cant get doc');
  }
}
