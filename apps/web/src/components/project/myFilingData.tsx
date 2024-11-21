'use client';
import SearchBar from '../searchbar/searchBar';
import { FileText } from 'lucide-react';
import NoFiling from './noFiling';
import AllFilingPanel from './allFilingPanel';
import PopoverAddFiling from './popoverAddFiling';
import { useEffect, useState } from 'react';
import { FilingType } from '@/src/interface/filing';
import getFilingByProjectId from '@/src/service/filing/getFilingByProjectId';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { Project } from '@/src/interface/project';

export default function MyFilingData({ projectId }: { projectId: string }) {
  const [filings, setFilings] = useState<FilingType[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const redirectToProject = (project: Project | FilingType) => {
    router.push(`/project/${project.id}`);
  };
  const redirectToFiling = (filing: FilingType) => {
    router.push(`/project/${filing.projectId}/${filing.id}`);
  };

  useEffect(() => {
    const fetchFilings = async () => {
      if (projectId) {
        try {
          const data = await getFilingByProjectId({ projectId });
          setFilings(data);
          setIsFetched(true);
        } catch (err) {
          if (err instanceof Error) {
            toast({
              title: 'ไม่สำเร็จ',
              description: err.message,
              isError: true,
            });
          }
        }
      }
    };
    fetchFilings();
  }, [projectId]);

  useEffect(() => {
    console.log(filings);
  }, [filings]);

  return (
    <div className="space-y-4 w-full ">
      <div className="flex flex-row justify-between items-center">
        <div className="font-sukhumvit text-lg sm::text-base flex items-center font-bold ">
          <FileText style={{ marginRight: '10' }} />
          เอกสาร
        </div>
        <div className="flex-grow mx-4">
          <SearchBar
            filings={filings}
            projects={[]}
            placeholder="ค้นหาเอกสาร"
            projectFunc={redirectToProject}
            filingFunc={redirectToFiling}
          />
        </div>

        <div className="">
          <PopoverAddFiling
            projectId={projectId}
            addFilingToParent={(filing: FilingType) => {
              setFilings((prevFilings) => [...prevFilings, filing]);
            }}
          />
        </div>
      </div>
      {isFetched && (
        <>
          {filings.length === 0 ? (
            <NoFiling
              projectId={projectId}
              setNewFilingToParent={(filing: FilingType) => {
                setFilings((prevFilings) => [...prevFilings, filing]);
              }}
            />
          ) : (
            <AllFilingPanel filings={filings} setFilings={setFilings} />
          )}
        </>
      )}
    </div>
  );
}
