'use client';
import { useEffect, useState } from 'react';
import type { Filing } from '@/src/interface/filing';
import getFilingByProjectId from '@/src/service/filing/getFilingByProjectId';
import { toast } from '../ui/use-toast';
import { StatusTable } from '../status/statusTable';
import NoFiling from './noFiling';

export default function MyFilingData({ projectId }: { projectId: string }) {
  const [filings, setFilings] = useState<Filing[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  // const router = useRouter();

  // const redirectToProject = (project: Project | Filing) => {
  //   router.push(`/project/${project.id}`);
  // };
  // const redirectToFiling = (filing: Filing) => {
  //   router.push(`/project/${filing.projectId}/${filing.id}`);
  // };

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
    void fetchFilings();
  }, [projectId]);

  const updateFiling = (filing: Filing) => {
    setFilings((prevFilings) => [filing, ...prevFilings]);
  };

  const updateTel = (tel: string) => {
    setFilings((prevFilings) =>
      prevFilings.map((f) => (f.user ? { ...f, user: { ...f.user, tel } } : f)),
    );
  };

  return (
    <div className="w-full">
      {/* <div className="flex flex-row justify-between items-center">
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
            addFilingToParent={(filing: Filing) => {
              setFilings((prevFilings) => [...prevFilings, filing]);
            }}
          />
        </div>
      </div> */}
      {isFetched ? (
        <>
          {filings.length === 0 ? (
            <NoFiling
              projectId={projectId}
              setNewFilingToParent={(filing: Filing) => {
                setFilings((prevFilings) => [...prevFilings, filing]);
              }}
            />
          ) : (
            // <AllFilingPanel filings={filings} setFilings={setFilings} />
            <StatusTable
              data={filings}
              projectId={projectId}
              updateFiling={updateFiling}
              updateTel={updateTel}
            />
          )}
        </>
      ) : null}
    </div>
  );
}
