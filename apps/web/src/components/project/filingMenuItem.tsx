import { BiSolidFilePdf } from 'react-icons/bi';
import { DocumentType } from '@/src/interface/document';
import { FilingType } from '@/src/interface/filing';
import findDocumentsByFilingId from '@/src/service/findDocumentsByFilingId';
import { TextMyProject, buttonColors } from '@/src/styles/enumMap';
import { useEffect, useState } from 'react';
import { toast } from '../ui/use-toast';
import { User } from '@/src/interface/user';
import { findUserByCondition } from '@/src/service/findUserByCondition';

export default function FilingMenuItem({ filing }: { filing: FilingType }) {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [filingOwner, setFilingOwner] = useState<User | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const getDocumentAndOwnerDetail = async () => {
    try {
      const docs = await findDocumentsByFilingId(filing.id);
      if (docs.length) setDocuments(docs);
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
    window.open(documents[0].pdfName, '_blank');
  };
  useEffect(() => {
    getDocumentAndOwnerDetail();
  }, []);

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
        <td className="p-4 py-5 text-nowrap text-center max-w-[160px] overflow-hidden text-ellipsis whitespace-nowrap">
          {documents.length > 0 ? documents[0].name : '-'}
        </td>
        <td className="p-4 py-5 text-nowrap text-center max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
          {filingOwner ? filingOwner.name : '-'}
        </td>
        <td className="p-4 py-5 text-nowrap text-center">
          <p className={`rounded-lg px-2 py-1 ${buttonColors[filing.status]}`}>
            {TextMyProject[filing.status]}
          </p>
        </td>
        <td className="p-4 py-5 text-nowrap text-center max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
          {documents[0]?.detail || '-'}
        </td>
        <td className="p-4 py-5 text-nowrap text-center w-[60px]">
          <BiSolidFilePdf
            size={24}
            className={`text-red hover:cursor-pointer ${documents.length === 0 ? 'opacity-50 hover:cursor-not-allowed' : ''}`}
            onClick={() => {
              if (documents.length > 0) {
                handleClick();
              }
            }}
          />
        </td>
      </tr>
    )
  );
}
