import type { Filing } from '@/src/interface/filing';
import type { Project } from '@/src/interface/project';
import type { Gendoc } from '@/src/interface/gendoc';
import SearchBar from '../searchbar/searchBar';

export default function SearchPanel({
  filings,
  projects,
  gendocs,
  placeHolder,
  projectFunc,
  filingFunc,
  gendocFunc,
  clearFunc,
}: {
  filings?: Filing[];
  projects?: Project[];
  gendocs?: Gendoc[];
  placeHolder: string;
  projectFunc?: (project: Project) => void;
  filingFunc?: (filing: Filing) => void;
  gendocFunc?: (gendoc: Gendoc) => void;
  clearFunc?: () => void;
}) {
  return (
    <div className="flex-grow">
      <SearchBar
        filings={filings || []}
        projects={projects || []}
        gendocs={gendocs || []}
        placeholder={placeHolder}
        filingFunc={filingFunc}
        projectFunc={projectFunc}
        gendocFunc={gendocFunc}
        clearFunc={clearFunc}
      />
    </div>
  );
}
