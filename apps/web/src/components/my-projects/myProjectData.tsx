"use client";

import LastestPanel from "./lastestPanel";
import AllProjecPanel from "./allProjectPanel";
import NoProject from "./noProject";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProjectType } from "@/src/interface/project";
import { FillingType } from "@/src/interface/filling";
import getProjectByUserId from "@/src/service/getProjectByUserId";
import SearchBar from "../searchbar/searchBar";

import { mockFillings } from "@/src/mock/data";

export default function MyProjectData() {
  const router = useRouter();
  const redirectToProject = (project: ProjectType | FillingType) => {
    router.push(`/my-projects/${project.id}`);
  };

  const [projects, setProjects] = useState<ProjectType[]>([]);

  //TODO : Change the userId to the actual userId
  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjectByUserId(
        "d1c0d106-1a4a-4729-9033-1b2b2d52e98a"
      );
      console.log(data);
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <>
      <div className="w-[50vw]">
        <SearchBar
          fillings={mockFillings}
          projects={projects}
          placeholder="ค้นหาโครงการหรือเอกสาร"
          projectFunc={redirectToProject}
          fillingFunc={() => {}}
        />
      </div>
      {projects.length === 0 ? (
        <NoProject />
      ) : (
        <>
          <LastestPanel />
          <AllProjecPanel projects={projects} />
        </>
      )}
    </>
  );
}
