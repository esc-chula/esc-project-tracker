import { CreateDocumentDTO } from '../../../../api/src/document_/document.dto';
import { trpc } from '../../app/trpc';
import { Document } from '@/src/interface/document';

export default async function createDocument({
  document,
}: {
  document: CreateDocumentDTO;
}): Promise<Document> {
  try {
    console.log(document);
    const result = await trpc.document.createDocument.mutate(document);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('failed to create document');
  }
}
