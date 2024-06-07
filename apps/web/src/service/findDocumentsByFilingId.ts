import { trpc } from "../app/trpc";
import { documentType } from "../interface/document";
export default async function findDocumentsByFilingId(
  filingId: string
): Promise<documentType[]> {
  try {
    const data = await trpc.findDocumentsByFilingId.query({ filingId });
    if (data) return data;
    else return [];
  } catch (e) {
    console.log(e);
    throw new Error("Cant get doc");
  }
}
