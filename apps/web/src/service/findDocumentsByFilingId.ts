import { trpc } from "../app/trpc"
import { Document } from "../interface/document"

export default async function findDocumentsByFilingId(filingId: string): Promise<Document[]> {
  try {
    const data = await trpc.document.findDocumentsByFilingId.query({
      filingId,
    })
    return data
  } catch (err) {
    console.error("findDocumentsByFilingId error: ", err)
    throw new Error("ไม่สามารถดึงประวัติเอกสารได้")
  }
}
