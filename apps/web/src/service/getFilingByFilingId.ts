import { trpc } from "../app/trpc"
import { Filing } from "../interface/filing"

export default async function getFilingByFilingId(filingId: string): Promise<Filing | null> {
  try {
    const filing = await trpc.filing.getFilingByFilingId.query({
      filingId,
    })
    return filing
  } catch (err) {
    console.error("getFilingByFilingId error: ", err)
    throw new Error("ไม่สามารถดึงข้อมูลเอกสารได้")
  }
}
