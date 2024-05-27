import { FilingType } from "../interface/filing"
import { trpc } from "../app/trpc"

export default async function getFilingsByUserId({
  userId,
}: {
  userId: string
}): Promise<FilingType[]> {
  try {
    const data = await trpc.findFilingsByUserId.query({ userId })
    return data
  } catch (err) {
    alert(err)
    return []
  }
}
