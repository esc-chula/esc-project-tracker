import {
  DocumentActivity,
  DocumentStatus,
} from '../../../../api/src/constant/enum';
import { trpc } from '../../app/trpc';
import { Document } from '../../interface/document';
export default async function updateDocument({
  docId,
  obj,
}: {
  docId: string;
  obj: {
    name?: string;
    activity?: DocumentActivity;
    status?: DocumentStatus;
    detail?: string;
    comment?: string;
    pdfName?: string;
    docName?: string;
  };
}): Promise<Document> {
  try {
    const result = await trpc.document.updateDocument.mutate({ docId, obj });
    return result;
  } catch (error) {
    throw new Error('failed');
  }
}
