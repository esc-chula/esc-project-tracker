import { BiSolidFilePdf } from 'react-icons/bi';
import { DocumentType } from '@/src/interface/document';
import { FilingType } from '@/src/interface/filing';
import findDocumentsByFilingId from '@/src/service/findDocumentsByFilingId';
import { TextMyProject, buttonColors } from '@/src/styles/enumMap';
import { useEffect, useState } from 'react';
import { toast } from '../ui/use-toast';
import { User } from '@/src/interface/user';
import { findUserByCondition } from '@/src/service/findUserByCondition';
import { FilingStatus } from '@/src/constant/enum';
import { CreateDocumentDTO } from '../../../../api/src/document_/document.dto';
import {
  DocumentActivity,
  DocumentStatus,
} from '../../../../api/src/constant/enum';
import findLatestDocumentByFilingId from '@/src/service/findLatestDocumentByFilingId';

export default function FilingMenuItem({
  filing,
  isUpdateMode,
  setPrepareUpdatedDocument,
}: {
  filing: FilingType;
  isUpdateMode: boolean;
  setPrepareUpdatedDocument: (newDocument: CreateDocumentDTO) => void;
}) {
  const [document, setDocuments] = useState<DocumentType | null>(null);
  const [filingOwner, setFilingOwner] = useState<User | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [detail, setDetail] = useState<string>(document?.detail || '');
  const [name, setName] = useState<string>(document?.name || '');
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const getDocumentAndOwnerDetail = async () => {
    try {
      const docs = await findLatestDocumentByFilingId(filing.id);
      if (docs) {
        setDocuments(docs);
        setDetail(docs.detail);
        setName(docs.name);
      }
      const owner = await findUserByCondition({ id: filing.userId });
      if (owner) setFilingOwner(owner);
      setIsFetched(true);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: `ดึงข้อมูลเอกสาร  ${filing.projectCode}-${filing.FilingCode} ไม่สำเร็จ`,
          description: error.message,
          isError: true,
        });
        return;
      }
    }
  };
  const handleClick = () => {
    window.open(document?.pdfName, '_blank');
  };
  useEffect(() => {
    getDocumentAndOwnerDetail();
  }, []);

  const updateFiling = () => {
    if (isDirty && filing.status === FilingStatus.APPROVED) {
      const newDocument: CreateDocumentDTO = {
        filingId: filing.id,
        name: name || 'แก้ไขหมายเหตุ',
        detail: detail,
        pdfName: document?.pdfName || '-',
        docName: document?.docName || '-',
        activity: DocumentActivity.EDIT,

        // TODO : user real current userId
        userId: document?.userId || 'd1c0d106-1a4a-4729-9033-1b2b2d52e98a',
        status: DocumentStatus.APPROVED,
      };
      setPrepareUpdatedDocument(newDocument);
    }
  };

  if (!isFetched) return null;
  return (
    isFetched && (
      <tr className="border-b-2 border-gray-200">
        <td className="p-4 py-5 text-nowrap text-center min-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
          {filing.projectCode + '-' + filing.FilingCode}
        </td>
        <td className="p-4 py-5 text-nowrap max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
          {filing.name}
        </td>
        <td className="p-4 py-5 text-nowrap text-center">
          {filing.createdAt.slice(0, 10)}
        </td>
        <td className="relative w-[150px] h-[40px]">
          <div className="absolute inset-0 flex items-center justify-center">
            {isUpdateMode && filing.status === FilingStatus.APPROVED ? (
              <textarea
                value={name}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none transition-all duration-300 ease-in-out focus:h-36 focus:z-40"
                placeholder="-"
                onChange={(e) => {
                  setName(e.target.value as string);
                  setIsDirty(true);
                }}
                onBlur={() => updateFiling()}
              />
            ) : (
              <div className="text-nowrap text-center w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {name || '-'}
              </div>
            )}
          </div>
        </td>
        <td className="p-4 py-5 text-nowrap text-center max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
          {filingOwner ? filingOwner.username : '-'}
        </td>
        <td className="p-4 py-5 text-nowrap text-center">
          <p className={`rounded-lg px-2 py-1 ${buttonColors[filing.status]}`}>
            {TextMyProject[filing.status]}
          </p>
        </td>
        <td className="relative w-[150px] h-[40px]">
          <div className="absolute inset-0 flex items-center justify-center">
            {isUpdateMode && filing.status === FilingStatus.APPROVED ? (
              <textarea
                value={detail}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none transition-all duration-300 ease-in-out focus:h-36 focus:z-40"
                placeholder="-"
                onChange={(e) => {
                  setDetail(e.target.value as string);
                  setIsDirty(true);
                }}
                onBlur={() => updateFiling()}
              />
            ) : (
              <div className="text-nowrap text-center w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {detail || '-'}
              </div>
            )}
          </div>
        </td>
        <td className="p-4 py-5 text-nowrap text-center w-[60px]">
          <BiSolidFilePdf
            size={24}
            className={`text-red hover:cursor-pointer ${document ? 'opacity-50 hover:cursor-not-allowed' : ''}`}
            onClick={() => {
              if (document) {
                handleClick();
              }
            }}
          />
        </td>
      </tr>
    )
  );
}
