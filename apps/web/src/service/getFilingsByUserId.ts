import { FilingType } from "../interface/filing"
import { trpc } from "../app/trpc"

export default async function getFilingsByUserId(userId: string): Promise<FilingType[]> {
  try {
    const data = await trpc.findFilingsByUserId.query({ userId })
    return data
  } catch (err) {
    console.error(err)
    return []
  }
}
