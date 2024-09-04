'use client';
import { FilingType } from '@/src/interface/filing';
import findLatestDocumentByFilingId from '@/src/service/document/findLatestDocumentByFilingId';
import { useEffect, useMemo, useState } from 'react';
import { FaFile } from 'react-icons/fa';
import { toast } from '../ui/use-toast';
import findProjectsWithFilter from '@/src/service/project/findProjectsWithFilter';
import getProjectByProjectId from '@/src/service/project/getProjectByProjectId';
import { DocumentType } from '@/src/interface/document';

export default function FilingTabShowDetail({
  filing,
}: {
  filing: FilingType;
}) {
  const [projectName, setProjectName] = useState<string | undefined>(undefined);
  const [latestDocument, setLatestDocument] = useState<any>(undefined); // Update type as needed

  useEffect(() => {
    const fetchProjectName = async () => {
      try {
        const project = await getProjectByProjectId(filing.projectId);
        setProjectName(project?.name);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: `ดึงข้อมูลชื่อโครงการ ${filing.projectId} ไม่สำเร็จ`,
            description: error.message,
            isError: true,
          });
        }
      }
    };

    const fetchLatestDocument = async () => {
      try {
        const docs = await findLatestDocumentByFilingId(filing.id);
        setLatestDocument(docs);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: `ดึงข้อมูลเอกสาร ${filing.projectCode}-${filing.FilingCode} ไม่สำเร็จ`,
            description: error.message,
            isError: true,
          });
        }
      }
    };

    fetchProjectName();
    fetchLatestDocument();
  }, [filing]);

  useEffect(() => {
    console.log(filing);
  }, []);

  return (
    <div className="w-full p-2 border-y-lightgray border-y-2 px-4 space-y-2">
      <div className="flex flex-row justify-between items-center">
        <div className="font-bold text-black truncate overflow-hidden whitespace-nowrap w-[50%]">
          {projectName || 'ไม่มีชื่อโครงการ'}
        </div>
        <div className="flex-shrink-0">10 มิ.ย. 67</div>
      </div>

      <div className="flex flex-row space-x-2 items-center">
        <div className="flex-shrink-0">
          {filing.projectCode || 'xxxx'}-{filing.FilingCode || 'xxxx'}
        </div>
        <div className="truncate overflow-hidden whitespace-nowrap w-[50%] pr-5">
          {filing.name || 'ไม่มีชื่อเอกสาร'}
        </div>
      </div>
      {/*
      TODO : use fileDisplay from feat/filing-detail*/}
      <div className="py-2 px-4 border-black flex flex-row border-2 rounded-xl w-[80%] space-x-2 items-center">
        <FaFile size={20} className="text-orange-500 flex-shrink-0" />
        <div className="flex flex-col text-xs flex-grow">
          <div className="truncate overflow-hidden whitespace-nowrap w-[80%]">
            เอกสารเปิดโคร การสำหรับหหหหหหหหหหหหหsssssssssssssss
          </div>
          <div className="mt-1">.PDF</div>
        </div>
      </div>
    </div>
  );
}
