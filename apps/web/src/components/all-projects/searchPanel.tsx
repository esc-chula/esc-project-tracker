import { FilingType } from "@/src/interface/filing";
import SearchBar from "../searchbar/searchBar";
import AddNewProjectButton from "./addNewProjectButton";
import { ProjectType } from "@/src/interface/project";

export default function SearchPanel({
  filings,
  projects,
  placeHolder,
  projectFunc,
  FilingFunc,
}: {
  filings?: FilingType[];
  projects?: ProjectType[];
  placeHolder: string;
  projectFunc?: (project: ProjectType | FilingType) => any;
  FilingFunc?: (Filing: ProjectType | FilingType) => any;
}) {
  return (
    <div className="flex flex-row space-x-4 w-full items-center">
      <div className="flex-grow">
        {}
        <SearchBar
          Filings={[]}
          projects={[]}
          placeholder={placeHolder}
          FilingFunc={FilingFunc}
        />
      </div>
      <div className="items-center flex text-center">
        <AddNewProjectButton />
      </div>
    </div>
  );
}
