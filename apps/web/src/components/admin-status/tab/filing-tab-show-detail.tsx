'use client';
import { FilingType } from '@/src/interface/filing';
import { useEffect, useState } from 'react';
import getProjectByProjectId from '@/src/service/project/getProjectByProjectId';
import { DocumentType } from '@/src/interface/document';
import { formatDateMoment } from '@/src/lib/utils';
import { toast } from '../../ui/use-toast';
import FileDisplay from '../../filling-detail/display/fileDisplay';
import findLatestPendingDocumentByFilingId from '@/src/service/document/findLatestPendingByFilingId';

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
  const [latestPendingDocument, setLatestPendingDocument] =
    useState<DocumentType | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);

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

    const fetchLatestPendingDocument = async () => {
      try {
        const docs = await findLatestPendingDocumentByFilingId(filing.id);
        setLatestPendingDocument(docs);
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

    const fetchData = async () => {
      await Promise.all([fetchProjectName(), fetchLatestPendingDocument()]);
      setIsFetched(true);
    };

    fetchData();
  }, [filing]);

  if (!isFetched) {
    return;
  }

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
          {projectName || '...'}
        </div>
        <div className="flex-shrink-0">
          {formatDateMoment(latestPendingDocument?.createdAt) || '--'}
        </div>
      </div>

      <div className="flex flex-row space-x-2 items-center">
        <div className="flex-shrink-0">
          {filing.projectCode || '....'}-{filing.FilingCode || '....'}
        </div>
        <div className="truncate overflow-hidden whitespace-nowrap w-[50%] pr-5">
          {filing.name || '...'}
        </div>
      </div>

      {latestPendingDocument?.pdfName !== '' &&
      latestPendingDocument?.pdfName !== '-' ? (
        <div className="flex flex-row space-x-4">
          <FileDisplay
            fileName={latestPendingDocument?.pdfName || ''}
            fileType="pdf"
            folderName={`${projectId}/${filing.id}`}
          />
        </div>
      ) : (
        <div className="text-red">ไม่พบเอกสาร</div>
      )}
    </div>
  );
}
