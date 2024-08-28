'use client';
import SearchBar from '../searchbar/searchBar';
import { FileText } from 'lucide-react';
import NoDocument from './noDocument';
import AllDocumentPanel from './allDocumentPanel';
import PopoverAddDocument from './popoverAddDocument';
import { useEffect, useState } from 'react';
import { Filing } from '@/src/interface/filing';
import getFilingByProjectId from '@/src/service/filing/getFilingByProjectId';
import { useToast } from '../ui/use-toast';

export default function MyDocumentData({ projectId }: { projectId: string }) {
  const [Filings, setFilings] = useState<Filing[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const { toast } = useToast();

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
    console.log(Filings);
  }, [Filings]);

  return (
    <div className="space-y-4 w-[65%] ">
      <div className="flex flex-row justify-between items-center">
        <div className="font-sukhumvit text-lg sm::text-base flex items-center font-bold ">
          <FileText style={{ marginRight: '10' }} />
          เอกสาร
        </div>
        <div className="flex-grow mx-4">
          <SearchBar
            Filings={Filings}
            projects={[]}
            placeholder="ค้นหาเอกสาร"
          />
        </div>

        <div className="">
          <PopoverAddDocument
            projectId={projectId}
            addFilingToParent={(filing: Filing) => {
              setFilings((prevFilings) => [...prevFilings, filing]);
            }}
          />
        </div>
      </div>
      {isFetched && (
        <>
          {Filings.length === 0 ? (
            <NoDocument
              projectId={projectId}
              setNewFilingToParent={(filing: Filing) => {
                setFilings((prevFilings) => [...prevFilings, filing]);
              }}
            />
          ) : (
            <AllDocumentPanel
              Filings={Filings}
              setFilingsToParentFunc={(newFilings: Filing[]) => {
                setFilings(newFilings);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
