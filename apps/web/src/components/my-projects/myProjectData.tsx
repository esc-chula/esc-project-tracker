"use client";
import { MockFilling, MockProject } from "@/src/mock/type";
import SearchBar from "../searchbar/searchBar";
import { mockFillings, mockProjects, noMockProjects } from "@/src/mock/data";
import LastestPanel from "./lastestPanel";
import AllProjecPanel from "./allProjectPanel";
import NoProject from "./noProject";
import { useRouter } from "next/navigation";

const projects: MockProject[] = mockProjects;
const allFilling: MockFilling[] = mockFillings;

export default function MyProjectData() {
  const router = useRouter();
  const redirectToProject = (project: MockProject | MockFilling) => {
    if (project.objectType === "project") {
      router.push(`/my-projects/${project.id}`);
    }
  };
  return (
    <>
      <div className="w-[50vw]">
        <SearchBar
          fillings={allFilling}
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
