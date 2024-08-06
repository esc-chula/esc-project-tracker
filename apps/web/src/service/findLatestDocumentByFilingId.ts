import { trpc } from "../app/trpc";
import { DocumentType } from "../interface/document";

export default async function findLatestDocumentByFilingId(
  filingId: string
): Promise<DocumentType | null> {
  try {
    const data = await trpc.document.findLatestDocumentByFilingId.query({
      filingId,
    });
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Cant get doc");
  }
}