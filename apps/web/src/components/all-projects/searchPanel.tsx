import { FilingType } from '@/src/interface/filing';
import SearchBar from '../searchbar/searchBar';
import AddNewProjectButton from './addNewProjectButton';
import { Project } from '@/src/interface/project';

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
  FilingFunc?: (FilingType: FilingType | Project) => void;
  clearFunc?: () => void;
}) {
  return (
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
  );
}
