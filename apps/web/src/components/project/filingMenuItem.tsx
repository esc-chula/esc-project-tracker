'use client';

import { BiSolidFilePdf } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import type { CreateDocumentDTO } from '../../../../api/src/document_/document.dto';
import { TextMyProject, buttonColors } from '@/src/styles/enumMap';
import type { Filing } from '@/src/interface/filing';
import type { DocumentType } from '@/src/interface/document';
import type { User } from '@/src/interface/user';
import { findUserByCondition } from '@/src/service/user/findUserByCondition';
import {
  DocumentActivity,
  DocumentStatus,
  FilingStatus,
} from '@/src/constant/enum';
import findLatestDocumentByFilingId from '@/src/service/document/findLatestDocumentByFilingId';
import getUrlToFile from '@/src/service/aws/getUrlToFile';
import { toast } from '../ui/use-toast';

export default function FilingMenuItem({
  filing,
  isUpdateMode,
  setPrepareUpdatedDocument,
}: {
  filing: Filing;
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
      // get pdf url
      const docs = await findLatestDocumentByFilingId(filing.id);
      if (docs) {
        setDocuments(docs);
        if (docs.detail) setDetail(docs.detail);
        if (docs.name) setName(docs.name);
      }
      const owner = await findUserByCondition({ id: filing.userId });
      if (owner) setFilingOwner(owner);
      setIsFetched(true);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: `ดึงข้อมูลเอกสาร  ${filing.projectCode}-${filing.filingCode} ไม่สำเร็จ`,
          description: error.message,
          isError: true,
        });
      }
    }
  };

  const handleClick = async () => {
    const signedUrl = await getUrlToFile({
      fileName: document?.pdfName ?? '',
      folderName: `${filing.projectId}/${filing.id}`,
    });
    window.open(signedUrl, '_blank');
  };

  useEffect(() => {
    void getDocumentAndOwnerDetail();
  }, []);

  const updateFiling = () => {
    if (
      isDirty &&
      filing.status === FilingStatus.APPROVED &&
      document?.userId
    ) {
      const newDocument: CreateDocumentDTO = {
        filingId: filing.id,
        name: name || 'แก้ไขหมายเหตุ',
        detail,
        pdfName: document.pdfName || '-',
        docName: document.docName || '-',
        activity: DocumentActivity.EDIT,
        userId: document.userId,
        status: DocumentStatus.APPROVED,
      };
      setPrepareUpdatedDocument(newDocument);
    }
  };

  if (!isFetched) return null;
  return (
    <tr className="border-b-2 border-gray-200">
      <td className="p-4 py-5 text-nowrap text-center min-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
        {`${filing.projectCode}-${filing.filingCode}`}
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
                setName(e.target.value);
                setIsDirty(true);
              }}
              onBlur={() => {
                updateFiling();
              }}
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
                setDetail(e.target.value);
                setIsDirty(true);
              }}
              onBlur={() => {
                updateFiling();
              }}
            />
          ) : (
            <div className="text-nowrap text-center w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {detail || '-'}
            </div>
          )}
        </div>
      </td>
      <td className="p-4 py-5 text-nowrap text-center w-[60px]">
        <div
          onClick={() => handleClick()}
          className={`text-red ${document && document.pdfName !== '' && document.pdfName !== '-' ? ' cursor-pointer' : 'opacity-50 pointer-events-none'}`}
        >
          <BiSolidFilePdf size={24} />
        </div>
      </td>
    </tr>
  );
}
