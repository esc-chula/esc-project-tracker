"use client";

import LastestPanel from "./lastestPanel";
import AllProjecPanel from "./allProjectPanel";
import NoProject from "./noProject";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProjectType, ProjectWithLastOpenType } from "@/src/interface/project";
import { FilingType } from "@/src/interface/filing";
import getProjectsByUserId from "@/src/service/getProjectsByUserId";
import SearchBar from "../searchbar/searchBar";
import getFilingByUserId from "@/src/service/getFilingsByUserId";
import { useToast } from "../ui/use-toast";

export default function MyProjectData() {
  const { toast } = useToast();
  const router = useRouter();
  const redirectToProject = (project: ProjectType | FilingType) => {
    router.push(`/my-projects/${project.id}`);
  };

  const [projectsWithLastOpen, setProjectsWithLastOpen] = useState<
    ProjectWithLastOpenType[]
  >([]);
  const [filing, setFiling] = useState<FilingType[]>([]);
  const [projects, setProjects] = useState<ProjectType[]>([]);
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
          const data = await getFilingByUserId(userId);
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
  }, []);

  return (
    <div className="w-[65%]">
      <div className="mb-5">
        <SearchBar
          Filings={filing}
          projects={projects}
          placeholder="ค้นหาโครงการหรือเอกสาร"
          projectFunc={redirectToProject}
          FilingFunc={() => {}}
        />
      </div>
      {isFetched && (
        <>
          {projects.length === 0 ? (
            <NoProject />
          ) : (
            <>
              <LastestPanel projectsWithLastOpen={projectsWithLastOpen} />
              <AllProjecPanel projects={projects} />
            </>
          )}
        </>
      )}
    </div>
  );
}
