import { Filing } from '@/src/interface/filing';
import SearchBar from '../searchbar/searchBar';
import { Project } from '@/src/interface/project';

export default function SearchPanel({
  filings,
  projects,
  placeHolder,
  projectFunc,
  filingFunc,
  clearFunc,
}: {
  filings?: Filing[];
  projects?: Project[];
  placeHolder: string;
  projectFunc?: (project: Project) => void;
  filingFunc?: (filing: Filing) => void;
  clearFunc?: () => void;
}) {
  return (
    <div className="flex-grow">
      <SearchBar
        filings={filings || []}
        projects={projects || []}
        placeholder={placeHolder}
        filingFunc={filingFunc}
        projectFunc={projectFunc}
        clearFunc={clearFunc}
      />
    </div>
  );
}
