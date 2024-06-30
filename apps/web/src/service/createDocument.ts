import { DocumentActivity } from "../../../api/src/constant/enum"
import { trpc } from "../app/trpc"
import { Document } from "../interface/document"

export default async function createDocument(
  name: string,
  filingId: string,
  pdfLink: string,
  docLink: string,
  activity: DocumentActivity,
  detail?: string | undefined
): Promise<Document> {
  try {
    const data = await trpc.document.createDocument.mutate({
      name,
      filingId,
      pdfLink,
      docLink,
      activity,
      detail,
    })

    return data
  } catch (err) {
    console.log(err)
    throw new Error("ไม่สามารถสร้างฉบับร่างของเอกสารได้")
  }
}
