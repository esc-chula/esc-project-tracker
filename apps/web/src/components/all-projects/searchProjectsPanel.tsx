import { ProjectType } from "@/src/interface/project";
import SearchBar from "../searchbar/searchBar";
import AddNewProjectButton from "./addNewProjectButton";

export default function SearchProjectsPanel({
  Projects,
}: {
  Projects: ProjectType[];
}) {
  return (
    <div className=" flex flex-row space-x-4 w-full items-center">
      <div className="flex-grow">
        <SearchBar
          Filings={[]}
          projects={Projects}
          placeholder="ค้นหาโครงการทั้งหมด"
          FilingFunc={() => {}}
        />
      </div>
      <div className="items-center flex text-center">
        <AddNewProjectButton />
      </div>
    </div>
  );
}
