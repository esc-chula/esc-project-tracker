"use client";

import LastestPanel from "./latestPanel";
import AllProjectPanel from "./allProjectPanel";
import NoProject from "./noProject";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Project, ProjectWithLastOpen } from "@/src/interface/project";
import { FilingType } from "@/src/interface/filing";
import getProjectsByUserId from "@/src/service/getProjectsByUserId";
import SearchBar from "../searchbar/searchBar";
import getFilingsByUserId from "@/src/service/getFilingsByUserId";
import { useToast } from "../ui/use-toast";

export default function MyProjectData({showSearchbar=true}:{showSearchbar?:boolean}) {
  const { toast } = useToast();
  const router = useRouter();
  const redirectToProject = (project: Project | FilingType) => {
    router.push(`/projects/${project.id}`);
  };

  const [projectsWithLastOpen, setProjectsWithLastOpen] = useState<
    ProjectWithLastOpen[]
  >([]);
  const [filing, setFiling] = useState<FilingType[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>(
    "d1c0d106-1a4a-4729-9033-1b2b2d52e98a"
  );

  //TODO : Change the userId to the actual userId
  useEffect(() => {
    const fetchProjects = async () => {
      if (userId) {
        try {
          const data = await getProjectsByUserId(userId);
          setProjectsWithLastOpen(data);
          setProjects(data.map((project) => project.project));
          setIsFetched(true);
        } catch (err) {
          if (err instanceof Error) {
            toast({
              title: "ไม่สำเร็จ",
              description: err.message,
              isError: true,
            });
          }
        }
      }
    };
    const fetchFiling = async () => {
      //TODO : Change the userId to the actual userId
      if (userId) {
        try {
          const data = await getFilingsByUserId(userId);
          setFiling(data);
        } catch (err) {
          if (err instanceof Error) {
            toast({
              title: "ไม่สำเร็จ",
              description: err.message,
              isError: true,
            });
          }
        }
      }
    };
    fetchProjects();
    fetchFiling();
  }, [projects]);

  return (
    <div className={showSearchbar ? "w-[65%]" : "w-full"}>
      <div className="mb-5">
        {showSearchbar && <SearchBar
          Filings={filing}
          projects={projects}
          placeholder="ค้นหาโครงการหรือเอกสาร"
          projectFunc={redirectToProject}
        />}
      </div>
      {isFetched && (
        <>
          {projects.length === 0 ? (
            <NoProject />
          ) : (
            <>
              <LastestPanel projectsWithLastOpen={projectsWithLastOpen} />
              <AllProjectPanel
                projects={projects}
                userId={userId}
                setProjectsToParentFunc={(newProjects: Project[]) => {
                  setProjects(newProjects);
                }}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
