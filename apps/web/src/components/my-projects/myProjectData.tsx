import { MockProject } from "@/src/mock/type";
import SearchBar from "../searchbar/searchBar";
import { mockProjects, noMockProjects } from "@/src/mock/data";
import LastestPanel from "./lastestPanel";
import AllProjecPanel from "./allProjectPanel";
import NoProject from "./noProject";

const projects: MockProject[] = mockProjects;

export default function MyProjectData() {
  return (
    <>
      <div className="w-[50vw]">
        <SearchBar />
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
