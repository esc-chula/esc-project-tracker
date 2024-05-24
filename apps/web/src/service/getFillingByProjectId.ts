import { FillingType } from "../interface/filling";
import { trpc } from "../app/trpc";

// Define a function to transform the fetched data to FillingType
/*function mapToFillings(data: any[]): FillingType[] {
  return data.map((item) => ({
    id: item.id,
    project: item.project,
    user: item.user,
    status: item.status,
    projectCode: item.projectCode,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));
}*/

// Use the transformation function in your fetch function
export default async function getDocumentByProjectId({
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
