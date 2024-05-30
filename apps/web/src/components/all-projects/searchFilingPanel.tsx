import { FilingType } from "@/src/interface/filing";
import SearchBar from "../searchbar/searchBar";
import AddNewProjectButton from "./addNewProjectButton";

export default function SearchFilingPanel({
  Filings,
}: {
  Filings: FilingType[];
}) {
  return (
    <div className="flex flex-row space-x-4 w-full items-center">
      <div className="flex-grow">
        <SearchBar
          Filings={Filings}
          projects={[]}
          placeholder="ค้นหาเอกสารทั้งหมด"
          FilingFunc={() => {}}
        />
      </div>
      <div className="items-center flex text-center">
        <AddNewProjectButton />
      </div>
    </div>
  );
}
