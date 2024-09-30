'use client';
import { FilingType } from '@/src/interface/filing';
import findLatestDocumentByFilingId from '@/src/service/document/findLatestDocumentByFilingId';
import { useEffect, useState } from 'react';
import { FaFile } from 'react-icons/fa';
import getProjectByProjectId from '@/src/service/project/getProjectByProjectId';
import { DocumentType } from '@/src/interface/document';
import { formatDate } from '@/src/lib/formateDate';
import { toast } from '../../ui/use-toast';
import FileDisplay from '../../filling-detail/display/fileDisplay';

export default function FilingTabShowDetail({
  filing,
  sentSelectedFilingIdToParent,
  isActive,
  setActiveFiling,
}: {
  filing: FilingType;
  sentSelectedFilingIdToParent?: (id: string) => void;
  isActive: boolean;
  setActiveFiling: (id: string) => void;
}) {
  const [projectName, setProjectName] = useState<string | undefined>(undefined);
  const [projectId, setProjectId] = useState<string | undefined>(undefined);
  const [latestDocument, setLatestDocument] = useState<DocumentType | null>(
    null,
  );

  useEffect(() => {
    const fetchProjectName = async () => {
      try {
        const project = await getProjectByProjectId(filing.projectId);
        setProjectName(project?.name || '');
        setProjectId(project?.id || '');
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

  return (
    <div
      className={`w-full p-2 border-y-lightgray border-y-2 px-4 space-y-2 hover:bg-orange-50 ${
        isActive ? 'bg-orange-50' : ''
      }`}
      onClick={() => {
        sentSelectedFilingIdToParent?.(filing.id);
        setActiveFiling(filing.id);
      }}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="font-bold text-black truncate overflow-hidden whitespace-nowrap w-[50%]">
          {projectName || 'ไม่มีชื่อโครงการ'}
        </div>
        <div className="flex-shrink-0">
          {formatDate(latestDocument?.createdAt) || '--'}
        </div>
      </div>

      <div className="flex flex-row space-x-2 items-center">
        <div className="flex-shrink-0">
          {filing.projectCode || 'xxxx'}-{filing.FilingCode || 'xxxx'}
        </div>
        <div className="truncate overflow-hidden whitespace-nowrap w-[50%] pr-5">
          {filing.name || 'ไม่มีชื่อเอกสาร'}
        </div>
      </div>

      <FileDisplay
        fileName={latestDocument?.pdfName || ''}
        fileType="pdf"
        folderName={`${projectId}/${filing.id}`}
      />
    </div>
  );
}
