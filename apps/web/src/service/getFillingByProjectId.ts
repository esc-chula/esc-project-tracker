import { FillingType } from "../interface/filling";
import { trpc } from "../app/trpc";

export default async function getFillingByProjectId({
  projectId,
}: {
  projectId: string;
}): Promise<FillingType[]> {
  try {
    const data = await trpc.findFillingsByProjectId.query({ projectId });
    return data;
  } catch (err) {
    alert(err);
    return [];
  }
}
