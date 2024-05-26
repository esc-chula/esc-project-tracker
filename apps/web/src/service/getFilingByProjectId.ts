import { FilingType } from "../interface/filing";
import { trpc } from "../app/trpc";

export default async function getFilingByProjectId({
  projectId,
}: {
  projectId: string;
}): Promise<FilingType[]> {
  try {
    const data = await trpc.findFilingsByProjectId.query({ projectId });
    return data;
  } catch (err) {
    alert(err);
    return [];
  }
}
