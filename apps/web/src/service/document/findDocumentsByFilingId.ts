import { trpc } from '../../app/trpc';
import { DocumentType } from '../../interface/document';
export default async function findDocumentsByFilingId(
  filingId: string,
): Promise<DocumentType[]> {
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
