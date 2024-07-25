import { DocumentActivity } from "../../../api/src/constant/enum";
import { trpc } from "../app/trpc";
import { DocumentType } from "../interface/document";
export default async function updateDocument({
  docId,
  obj,
}: {
  docId: string;
  obj: {
    name?: string;
    activity?: DocumentActivity;
    detail?: string;
    pdfLink?: string;
    docLink?: string;
  };
}): Promise<DocumentType> {
  try {
    const result = await trpc.document.updateDocument.mutate({ docId, obj });
    return result;
  } catch (error) {
    throw new Error("failed");
  }
}
