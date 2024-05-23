import { MockFilling, MockProject } from "@/src/mock/type";
import SearchBar from "../searchbar/searchBar";
import { mockProjects, mockFillings } from "@/src/mock/data";
import NoDocument from "./noDocument";
import AllDocumentPanel from "./allDocumentPanel";

const fillings: MockFilling[] = mockFillings;

export default function MyDocumentData() {
  return (
    <div>
      <div className="w-[50vw] flex flex-row">
        <div>เอกสาร</div>
        <SearchBar />
      </div>
      {fillings.length === 0 ? (
        <NoDocument />
      ) : (
        <>
          <AllDocumentPanel fillings={fillings} />
        </>
      )}
    </div>
  );
}
