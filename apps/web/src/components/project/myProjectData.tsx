"use client"

import LastestPanel from "./lastestPanel"
import AllProjecPanel from "./allProjectPanel"
import NoProject from "./noProject"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Project, ProjectWithLastOpen } from "@/src/interface/project"
import { Filing } from "@/src/interface/filing"
import getProjectsByUserId from "@/src/service/getProjectsByUserId"
import SearchBar from "../searchbar/searchBar"
import getFilingByUserId from "@/src/service/getFilingsByUserId"
import { useToast } from "../ui/use-toast"

export default function MyProjectData() {
  const { toast } = useToast()
  const router = useRouter()
  const redirectToProject = (project: Project | Filing) => {
    router.push(`/project/${project.id}`)
  }

  const [projectsWithLastOpen, setProjectsWithLastOpen] = useState<ProjectWithLastOpen[]>([])
  const [filing, setFiling] = useState<Filing[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>("d1c0d106-1a4a-4729-9033-1b2b2d52e98a")

  //TODO : Change the userId to the actual userId
  useEffect(() => {
    const fetchProjects = async () => {
      if (userId) {
        try {
          const data = await getProjectsByUserId(userId)
          setProjectsWithLastOpen(data)
          setProjects(data.map((project) => project.project))
          setIsFetched(true)
        } catch (err) {
          if (err instanceof Error) {
            toast({
              title: "ไม่สำเร็จ",
              description: err.message,
              isError: true,
            })
          }
        }
      }
    }
    const fetchFiling = async () => {
      //TODO : Change the userId to the actual userId
      if (userId) {
        try {
          const data = await getFilingByUserId(userId)
          setFiling(data)
        } catch (err) {
          if (err instanceof Error) {
            toast({
              title: "ไม่สำเร็จ",
              description: err.message,
              isError: true,
            })
          }
        }
      }
    }
    fetchProjects()
    fetchFiling()
  }, [projects])

  return (
    <div className="w-[65%]">
      <div className="mb-5">
        <SearchBar
          Filings={filing}
          projects={projects}
          placeholder="ค้นหาโครงการหรือเอกสาร"
          projectFunc={redirectToProject}
        />
      </div>
      {isFetched && (
        <>
          {projects.length === 0 ? (
            <NoProject />
          ) : (
            <>
              <LastestPanel projectsWithLastOpen={projectsWithLastOpen} />
              <AllProjecPanel
                projects={projects}
                userId={userId}
                setProjectsToParentFunc={(newProjects: Project[]) => {
                  setProjects(newProjects)
                }}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}
