import { trpc } from "../app/trpc"
import { ProjectType } from "../constant/enum"
import { Project } from "../interface/project"

export default async function createProject(
  name: string,
  type: ProjectType,
  detail?: string
): Promise<Project> {
  try {
    console.log(name, type, detail)

    const data = await trpc.createProject.mutate({
      name,
      type,
      detail,
    })

    return data
  } catch (err) {
    console.log(err)
    throw new Error("ไม่สามารถสร้างโครงการได้")
  }
}
