"use client"
import { trpc } from "@/src/app/trpc"
import Header from "../../../../components/header/header"
import Subtitle from "@/src/components/header/subtitle"
import MyDocumentData from "@/src/components/project/myDocumentData"
import { ProjectType } from "@/src/interface/project"
import { useEffect, useState } from "react"
import getProjectByProjectId from "@/src/service/getProjectByProjectId"

export default function Page({ params }: { params: { projectId: string } }) {
  const [project, setProject] = useState<ProjectType | null>(null)

  useEffect(() => {
    if (params?.projectId) {
      const fetchProject = async () => {
        const data = await getProjectByProjectId(params.projectId)
        setProject(data)
      }

      //TODO : Change the userId to the actual userId
      const updateLastOpen = async () => {
        await trpc.updateUserProjLastOpen.query({
          userId: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a",
          projectId: params.projectId,
        })
      }
      fetchProject()
      updateLastOpen()
    }
  }, [params])

  return (
    <>
      {project && (
        <main className="w-full pl-15 pr-5 pt-[68px] space-y-5 h-min-[100vh] ">
          <Header>
            <Subtitle
              project={`${project?.projectCode} ${project?.name}`}
              projectId={params.projectId as string}
            />
          </Header>

          <MyDocumentData projectId={params.projectId as string} />
        </main>
      )}
    </>
  )
}
