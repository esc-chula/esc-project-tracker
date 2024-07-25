import { FilingType } from "@/src/interface/filing";
import SearchBar from "../searchbar/searchBar";
import AddNewProjectButton from "./addNewProjectButton";
import { Project } from "@/src/interface/project";

export default function SearchPanel({
  filings,
  projects,
  placeHolder,
  projectFunc,
  FilingFunc,
  clearFunc,
}: {
  filings?: FilingType[];
  projects?: Project[];
  placeHolder: string;
  projectFunc?: (project: Project | FilingType) => void;
  FilingFunc?: (Filing: FilingType | Project) => void;
  clearFunc: () => void;
}) {
  return (
    <div className="flex flex-row space-x-4 w-full items-center">
      <div className="flex-grow">
        <SearchBar
          Filings={filings || []}
          projects={projects || []}
          placeholder={placeHolder}
          FilingFunc={FilingFunc}
          projectFunc={projectFunc}
          clearFunc={clearFunc}
        />
      </div>
      <div className="items-center flex text-center">
        <AddNewProjectButton />
      </div>
    </div>
  );
}
