'use client';
import { FilingType } from '@/src/interface/filing';
import { useEffect, useState } from 'react';
import getProjectByProjectId from '@/src/service/project/getProjectByProjectId';
import { DocumentType } from '@/src/interface/document';
import { formatDateMoment } from '@/src/lib/utils';
import { toast } from '../../ui/use-toast';
import FileDisplay from '../../filling-detail/display/fileDisplay';
import { FilingsWithDocument } from '@/src/types/filing';

export default function FilingTabShowDetail({
  filingWithPendingDocument,
  selectedFilingId,
  setSelectedFilingId,
  isActive,
  setActiveFiling,
}: {
  filingWithPendingDocument: FilingsWithDocument;
  isActive: boolean;
  selectedFilingId: string;
  setSelectedFilingId: (id: string) => void;
  setActiveFiling: (id: string) => void;
}) {
  const [projectName, setProjectName] = useState<string | undefined>(undefined);
  const [projectId, setProjectId] = useState<string | undefined>(undefined);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [filing, setFiling] = useState<FilingType | undefined>(undefined);
  const [document, setDocument] = useState<DocumentType | undefined>(undefined);

  useEffect(() => {
    const fetchProjectName = async () => {
      try {
        const project = await getProjectByProjectId(
          filingWithPendingDocument.filing.projectId,
        );
        setProjectName(project?.name || '');
        setProjectId(project?.id || '');
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: `ดึงข้อมูลชื่อโครงการ ${filingWithPendingDocument.filing.projectId} ไม่สำเร็จ`,
            description: error.message,
            isError: true,
          });
        }
      }
    };

    fetchProjectName();
    setFiling(filingWithPendingDocument.filing);
    setDocument(filingWithPendingDocument.document);
    setIsFetched(true);
  }, [filingWithPendingDocument]);

  if (!isFetched) {
    return;
  }

  return (
    <div
      className={`w-full p-2 border-y-lightgray border-y-2 px-4 space-y-2 hover:bg-orange-50 ${
        isActive ? 'bg-orange-50' : ''
      }`}
      onClick={() => {
        setSelectedFilingId(filing?.id || '');
        setActiveFiling(filing?.id || '');
      }}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="font-bold text-black truncate overflow-hidden whitespace-nowrap w-[50%]">
          {projectName || '...'}
        </div>
        <div className="flex-shrink-0">
          {formatDateMoment(document?.createdAt) || '--'}
        </div>
      </div>

      <div className="flex flex-row space-x-2 items-center">
        <div className="flex-shrink-0">
          {filing?.projectCode || '....'}-{filing?.FilingCode || '....'}
        </div>
        <div className="truncate overflow-hidden whitespace-nowrap w-[50%] pr-5">
          {filing?.name || '...'}
        </div>
      </div>

      {filingWithPendingDocument.document?.pdfName !== '' &&
      filingWithPendingDocument.document?.pdfName !== '-' ? (
        <div className="flex flex-row space-x-4">
          <FileDisplay
            fileName={document?.pdfName || ''}
            fileType="pdf"
            folderName={`${projectId}/${filing?.id}`}
          />
        </div>
      ) : (
        <div className="text-red">ไม่พบเอกสาร</div>
      )}
    </div>
  );
}
